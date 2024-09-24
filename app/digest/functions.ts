import React from "react";
import { convert } from "html-to-text";

import { NextResponse } from "next/server";

import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { basicQuizPrompt, formatConversion } from "../utils/prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";

import {
    RunnableSequence,
    RunnablePassthrough,
} from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";


export async function generateQuizData(url?: any) {

    //TODO: ensure the provided path is a valid url

    if (url && typeof url === "string") {
        //pull the html data of the provided url
        const response = await fetch(url);
        const data = await response.text();

        //cleanse the data so that we don't have all the html boilerplate
        const converted = convert(data, {
            selectors: [
                { selector: 'main' },
                { selector: 'a', format: 'skip' },
                { selector: 'img', format: 'skip' },
                { selector: 'input', format: 'skip' },
                { selector: 'form', format: 'skip' },
                { selector: 'iframe', format: 'skip' },
            ]
        });

        //initialize the open ai model
        const model = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0
        });

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400,
            chunkOverlap: 1
        });

        console.log(typeof converted);
        console.log("----***----");
        console.log(converted);
        console.log("----***----")
        //convert html content to vector store
        const parsedContentOutput = await splitter.createDocuments([JSON.stringify(converted)]);
        const parsedContentVectorStore = await MemoryVectorStore.fromDocuments(parsedContentOutput, new OpenAIEmbeddings());
        const parsedContentRetriever = parsedContentVectorStore.asRetriever();

        const QUIZ_GENERATION_PROMPT = PromptTemplate.fromTemplate(basicQuizPrompt);
        const QUIZ_REFORMAT_PROMPT = PromptTemplate.fromTemplate(formatConversion);

        //run the cleansed data through the prompt 

        const quizGenerationChain = RunnableSequence.from([
            {
                content: (input) => input.content,
            },
            QUIZ_GENERATION_PROMPT,
            model,
            new StringOutputParser()
        ]);

        const quizFormatChain = RunnableSequence.from([
            {
                quiz: (new RunnablePassthrough()),
            },
            QUIZ_REFORMAT_PROMPT,
            model,
            new JsonOutputParser()
        ]);

        const initialQuizGeneratorInvocation = await quizGenerationChain.invoke({
            //content: parsedContentRetriever.pipe(formatDocumentsAsString),
            content: converted
        })

        console.log("initialQuizGeneratorInvocation")
        console.log(initialQuizGeneratorInvocation);

        const formattedResult = await quizFormatChain.invoke(
            initialQuizGeneratorInvocation
        );

        console.log("formattedResult")
        console.log(formattedResult);

        return formattedResult;
    }

}