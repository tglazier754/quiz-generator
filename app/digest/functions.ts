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


////***************   TEST DATA 

/*

const formattedResult = {
            questions: [
                'What is the primary purpose of a page in the context of App Router?',
                'The `searchParams` object contains values that can be known ahead of time.',
                'The `params` object in the `Page` function contains information from the ______ segment down to that page.',
                'What is the significance of the `searchParams` object in the context of a page?',
                'In which version was the `page` feature introduced?',
                'The `searchParams` returns a URLSearchParams instance.',
                'Provide an example of how the `params` object might look for the URL `/shop/1/2`.',
                'Which of the following is NOT a valid way to define a route in the App Router?'
            ],
            answers: [
                'To serve as UI that is unique to a route',
                'False',
                'root',
                'The `searchParams` object allows the page to access query parameters from the current URL, which can change dynamically at request time.',
                'v13.0.0',
                'False',
                "The `params` object might look like `{ category: '1', item: '2' }` for the URL `/shop/1/2`.",
                '`/app/shop/page.js` - This does not follow the parameterized route structure.'
            ]
        }
        
*/