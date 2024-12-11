//prompt for requesting a basic quiz
export const basicQuizPrompt = `Generate a quiz that could be given to a student, including an answer key at the end, based on the following content.
Do not include any banter.
Include a brief description of the quiz.
content: {content}
quiz with answer key:`;

const quizFormat = "{quiz:{    name: string,        description: string    duration: number,        questions: [            {type: string,question: string,options?: string[],answer: string,duration: number}]}}"

//prompt for requestion quiz with parameters
export const paramterizedQuizPrompt = `
Generate a quiz using JSON format, that could be given to a student at grade level {grade_level}, including an answer key at the end, based on the following content. 
Follow the provided guidelines regarding expected duration in minutes and question type breakdown.
Do not include any banter.
Include a brief description of the quiz.
Use the following JSON schema :
{{
name:string,
description:string
duration:number,
questions:[
{{type:string,
question:string,
options?:string[],
answer:string,
expected_duration:number,
order:number}}
]
}}
expected duration: {expected_duration}
question breakdown:{quiz_breakdown}
content: {content}
quiz with answer key:`

//convert the provided quiz and answer key to a usable format
export const formatConversion = `Given a quiz in an unknown format, return a JSON object called quiz_questions of the format : [{{question, answer}}]. 
Markdown is not supported by the client. 
Include only a single string for each question and answer.
Include a field for a name and a description of the quiz.
provided quiz:{quiz}`

export const inputContentSummarizationPrompt = `Without losing any key information, generate a summary of the following content that would be suitable for {gradeLevel} students.
Do not inlcude any banter.
content: {content}
summary: `

export const quizFormatBreakdownPrompt = `Given an expected duration in minutes, a summary of the content to be covered, and a breakdown of question types for a quiz, determine the time allotment for each question.
Your answer should be in the following JSON format`