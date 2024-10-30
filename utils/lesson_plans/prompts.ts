//convert the provided quiz and answer key to a usable format
export const generateLessonPlanPrompt = `Given some content in an unknown format, generate a short lesson plan that can be used to teach students. 
Markdown is supported by the client. 
Include a field for a name and a description of the quiz.
provided content:{content}`

export const formatLessonPlanPrompt = `Given a lesson plan for a lecture, generate a name and a brief description.
Respond with a JSON object, in the format {{name, description}}.
Do not include any other fields.
provided lesson plan:{lesson_plan}`;