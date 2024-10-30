import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";
import { basicQuizPrompt, formatConversion } from "./prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";

import {
    RunnableSequence,
    RunnablePassthrough,
} from "@langchain/core/runnables";


export async function generateQuizDataFromText(contextData?: string) {

    //TODO: Ensure that we keep the data focused if the input is no good
    //TODO: return this as a promise for error handling

    if (contextData) {

        //initialize the open ai model
        const model = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0
        });

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
            content: contextData
        })



        console.log("initialQuizGeneratorInvocation")
        console.log(initialQuizGeneratorInvocation);

        const formattedQuiz = await quizFormatChain.invoke(
            initialQuizGeneratorInvocation
        );


        console.log("formattedResult")
        console.log(formattedQuiz);



        return JSON.stringify(formattedQuiz);
    }
    return "No data was included. Unable to generate a quiz.";

}
