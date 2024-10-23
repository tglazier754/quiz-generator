import { generateQuizDataFromText } from "@/utils/quiz/server";
import { createClient } from "@/utils/supabase/server";
import { TABLE_QUIZ_QUESTIONS, TABLE_RESOURCES, URL_PARAM_RESOURCE_ID } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";

export async function POST(request: Request) {
    //use POST because we will create the quiz data on the backend
    //get the parameters (resource id array)
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);

    const supabaseConnection = createClient();
    const { data: userData, error: userError } = await supabaseConnection?.auth.getUser();

    console.log("CHECK FOR USER DATA");

    //TODO: Proper checks for logged in user
    if (userData) {
        console.log(userData);
        //pull the resources from the database by their id
        const idList = searchParams.getAll(URL_PARAM_RESOURCE_ID);

        const { data, error } = await supabaseConnection.from('resources').select().in('id', idList);

        const mappedValues = data?.map((resource) => { return resource.value });
        const content = mappedValues?.join(" ");

        console.log("********* CONTENT ********");
        console.log(content);

        //call quiz generator OpenAI using the resources data

        const generatedQuizData = await generateQuizDataFromText(content);
        //const generatedQuizData = "Test";
        const generatedQuizObject = JSON.parse(generatedQuizData);
        //create a quiz entry in the database
        const { data: quizEntry, error: quizDbError } = await supabaseConnection.from(TABLE_RESOURCES).insert({ name: generatedQuizObject.name, description: generatedQuizObject.description, type: "QUIZ" }).select();
        //populate the questions table with all of the questions data using that new id
        const { id } = quizEntry && quizEntry[0] || "";
        if (id) {
            const preppedQuizQuestions = generatedQuizObject.questions.map((question: { question: string, answer: string }) => { return { resource_id: id, ...question } })
            console.log(preppedQuizQuestions);
            const { data: quizQuestionEntry, error: quizQuestionDbError } = await supabaseConnection.from(TABLE_QUIZ_QUESTIONS).insert(preppedQuizQuestions).select();
            console.log(quizQuestionEntry);
            console.log(quizQuestionDbError);
        }

        return new Response(JSON.stringify(generatedQuizData));

    }


    return new Response("POST QUIZ ENDPOINT");
}