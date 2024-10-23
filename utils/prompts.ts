//prompt for requesting a basic quiz
export const basicQuizPrompt = `Generate a quiz that could be given to a student, including an answer key at the end, based on the following content.
Do not include any banter.
Include a brief description of the quiz.
content: {content}
quiz with answer key:`;

//convert the provided quiz and answer key to a usable format
export const formatConversion = `Given a quiz in an unknown format, return a JSON object of the format : [{{question, answer}}]. 
Markdown is not supported by the client. 
Include only a single string for each question and answer.
Include a field for a name and a description of the quiz.
provided quiz:{quiz}`

export const websiteSummaryPrompt = `You are a teacher, giving a lesson to a student. Given the contents of a web page, generate a summary that will help the student learn the important information.
Markdown is not supported by the client.
Do not include any banter.
Do not mention that you are a teacher.
Respond with a plain-text string, in a conversational style.
Prefer to seperate thoughts using paragraphs, without including titles.
content: {content}`