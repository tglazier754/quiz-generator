import { generateQuizDataFromText } from "@/utils/quiz/server";
import { createClient } from "@/utils/supabase/server";
import { URL_PARAM_RESOURCE_ID } from "@/types/constants";
import { getCombinedContentFromSpecificResources, saveQuizToDatabase } from "@/utils/resources/server";


//TODO: Move this functionality into its own function
export async function POST(request: Request) {
    //use POST because we will create the quiz data on the backend
    //get the parameters (resource id array)

    console.log("POST");
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const parameters = await request.json();
    console.log(parameters);

    const supabaseConnection = createClient();
    const { data: userData } = await supabaseConnection?.auth.getUser();

    //TODO: Proper checks for logged in user
    if (userData) {
        //pull the resources from the database by their id
        const idList = searchParams.getAll(URL_PARAM_RESOURCE_ID);

        try {
            const inputContent = await getCombinedContentFromSpecificResources(idList);

            //call quiz generator OpenAI using the resources data

            const generatedQuizData = await generateQuizDataFromText(parameters, inputContent);
            const generatedQuizObject = JSON.parse(generatedQuizData);
            const postedQuizData = await saveQuizToDatabase(generatedQuizObject);

            if (postedQuizData) {
                return new Response(JSON.stringify(postedQuizData));
            }
            else {
                return new Response("Unable to generate quiz");
            }
        }
        catch (error) {
            console.log(error);
            return new Response("Unable to generate quiz");
        }
    }


    return new Response("POST QUIZ ENDPOINT");
}