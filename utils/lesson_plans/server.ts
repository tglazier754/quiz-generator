import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";
import { generateLessonPlanPrompt, formatLessonPlanPrompt } from "./prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";

import {
    RunnableSequence,
    RunnablePassthrough,
} from "@langchain/core/runnables";


export async function generateLessonPlanFromText(contextData?: string) {

    //TODO: Ensure that we keep the data focused if the input is no good
    //TODO: return this as a promise for error handling

    if (contextData) {

        //initialize the open ai model
        const model = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0
        });

        const LESSON_PLAN_GENERATION_PROMPT = PromptTemplate.fromTemplate(generateLessonPlanPrompt);
        const LESSON_PLAN_REFORMAT_PROMPT = PromptTemplate.fromTemplate(formatLessonPlanPrompt);

        //run the cleansed data through the prompt 

        const lessonPlanGenerationChain = RunnableSequence.from([
            {
                content: (input) => input.content,
            },
            LESSON_PLAN_GENERATION_PROMPT,
            model,
            new StringOutputParser()
        ]);


        const lessonPlanFormatChain = RunnableSequence.from([
            {
                lesson_plan: (new RunnablePassthrough()),
            },
            LESSON_PLAN_REFORMAT_PROMPT,
            model,
            new JsonOutputParser()
        ]);

        const initialLessonPlanGeneratorInvocation = await lessonPlanGenerationChain.invoke({
            content: contextData
        })



        console.log("initialQuizGeneratorInvocation")
        console.log(initialLessonPlanGeneratorInvocation);

        const formattedLessonPlan = await lessonPlanFormatChain.invoke(
            initialLessonPlanGeneratorInvocation
        );

        const descriptionObject = JSON.parse(JSON.stringify(formattedLessonPlan));
        const retObject = { ...descriptionObject, lesson_plan: initialLessonPlanGeneratorInvocation };


        console.log("formattedResult")
        console.log(retObject);



        return JSON.stringify(retObject);


    }
    return "No data was included. Unable to generate a lesson plan.";

}