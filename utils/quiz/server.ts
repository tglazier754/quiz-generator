import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";
import { paramterizedQuizPrompt } from "./prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import {
    RunnableSequence,
} from "@langchain/core/runnables";
import { ResourceGenerationParams } from "../resources/client";
import { StatusObject } from "@/types/globalTypes";

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
    expected_duration: number
}

export const generateQuiz = (parameters: ResourceGenerationParams, inputContent: string): Promise<StatusObject<QuizFormat>> => {
    const model = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });

    return (generateParameterizedQuiz(parameters, inputContent, model));
}

export const generateParameterizedQuiz = async (parameters: ResourceGenerationParams, inputContent: string, model: ChatOpenAI): Promise<StatusObject<QuizFormat>> => {
    //TODO: Check the paramaters first
    if (model && inputContent && inputContent !== "") {
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
            multiple_choice: parameters.multiple_choice_count,
            true_false: parameters.true_false_count
        };

        const generatedQuiz = await quizGenerationChain.invoke({
            content: inputContent,
            expected_duration: parameters.expected_duration,
            grade_level: parameters.grade_level,
            quiz_breakdown: quizBreakdown
        })

        return { status: "success", value: generatedQuiz };
    }
    return { status: "error", message: "Not enough data to generate parameterized quiz" };
}