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

export const websiteSummaryPrompt = `You are a teacher, giving a lesson to a student. Given the contents of a web page, generate a summary that will help the student learn the important information.
Only generate the contents of the lesson, do not attempt to talk to the student.
Do not include any banter.
Do not mention that you are a teacher.
content: {content}`