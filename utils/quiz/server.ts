import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";
import { basicQuizPrompt, formatConversion, paramterizedQuizPrompt } from "./prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";

import {
    RunnableSequence,
    RunnablePassthrough,
} from "@langchain/core/runnables";
import { ResourceGenerationParams } from "../resources/client";
import { StatusObject } from "@/types/globalTypes";




export async function generateQuizDataFromText(contextData?: string): Promise<StatusObject<string>> {

    //expected duration, in minutes
    //breakdown of each question type
    //input content
    //in-progress quiz

    //pre-determine the duration for each quiz question
    //go through each question one by one, providing the full input content and quiz history
    //generate a single question

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

        const formattedQuiz = await quizFormatChain.invoke(
            initialQuizGeneratorInvocation
        );
        return { status: "success", value: JSON.stringify(formattedQuiz) };
    }
    return { status: "error", message: "No data was included. Unable to generate a quiz." };

}

export type QuizFormat = {
    name: string,
    description: string
    duration: number,
    questions: QuizQuestion[]
}
export type QuizQuestion = {
    type: string,
    question: string,
    options?: string[],
    answer: string,
    duration: number
}

export const generateQuiz = (parameters: ResourceGenerationParams, inputContent: string): Promise<StatusObject<QuizFormat>> => {
    const model = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });

    return (generateParameterizedQuiz(parameters, inputContent, model));
}

/*
Input Content Summary

params : grade level, content
*/
export const summarizeInputContent = async (model: ChatOpenAI, inputContent: string, gradeLevel: number): Promise<StatusObject<string>> => {


    return { status: "error", message: "Not enough data to generate content summary" };
}

export const generateParameterizedQuiz = async (parameters: ResourceGenerationParams, inputContent: string, model: ChatOpenAI): Promise<StatusObject<QuizFormat>> => {
    //TODO: Check the paramaters first
    console.log(model);
    console.log(inputContent);
    if (model && inputContent) {
        const QUIZ_GENERATION_PROMPT = PromptTemplate.fromTemplate(paramterizedQuizPrompt);
        const quizGenerationChain = RunnableSequence.from([
            {
                content: (input) => input.content,
                expected_duration: (input) => input.expected_duration,
                quiz_breakdown: (input) => input.quiz_breakdown,
                grade_level: (input) => input.grade_level,
            },
            QUIZ_GENERATION_PROMPT,
            model,
            new JsonOutputParser()
        ]);

        const quizBreakdown = {
            long_form: parameters.long_form_count,
            short_answer: parameters.short_answer_count,
            multipleChoice: parameters.multiple_choice_count,
            true_false: parameters.true_false_count
        };

        const generatedQuiz = await quizGenerationChain.invoke({
            content: inputContent,
            expected_duration: parameters.expected_duration,
            grade_level: parameters.grade_level,
            quiz_breakdown: quizBreakdown
        })

        console.log(generatedQuiz);
        return { status: "success", value: generatedQuiz };
    }
    return { status: "error", message: "Not enough data to generate parameterized quiz" };
}