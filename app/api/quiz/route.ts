import { generateQuiz } from "@/utils/quiz/server";
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

            const generatedQuizStatusObject = await generateQuiz(parameters, inputContent);
            console.log(generatedQuizStatusObject);
            if (generatedQuizStatusObject.status === "success" && generatedQuizStatusObject.value) {
                const postedQuizData = await saveQuizToDatabase(generatedQuizStatusObject.value);
                //return new Response(JSON.stringify(generatedQuizStatusObject.value));
                if (postedQuizData) {
                    return new Response(JSON.stringify({ status: "success", data: postedQuizData }), { status: 200, statusText: "OK" });
                }
                else {
                    return new Response(JSON.stringify(generatedQuizStatusObject), { status: 500, statusText: "Server Error" });
                }
            }

            return new Response(JSON.stringify(generatedQuizStatusObject), { status: 500, statusText: "Server Error" });
        }
        catch (error) {
            console.log(error);
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 500, statusText: "Server Error" });
        }
    }


    return new Response(JSON.stringify({ status: "error", message: "Unauthorized User" }), { status: 401, statusText: "Unauthorized" });
}