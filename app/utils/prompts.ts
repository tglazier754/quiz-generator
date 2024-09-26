//prompt for requesting a basic quiz
export const basicQuizPrompt = `Generate a quiz that could be given to a student, including an answer key at the end, based on the following content.
content: {content}
quiz with answer key:`;

//convert the provided quiz and answer key to a usable format
export const formatConversion = `Given a quiz in an unknown format, return a JSON object of the format : {{questions:[], answers:[]}}. 
Markdown is not supported by the client. 
Include only a single string for each question and answer.
Do not include any additional objects or fields.
provided quiz:{quiz}`