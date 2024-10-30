import { RESOURCE_TYPE_LESSON_PLAN, TABLE_RESOURCES, URL_PARAM_RESOURCE_ID } from "@/types/constants";
import { generateLessonPlanFromText } from "@/utils/lesson_plans/server";
import { getCombinedContentFromSpecificResources } from "@/utils/resources/server";
import { createClient } from "@/utils/supabase/server";


//TODO: Move this functionality into its own function
export async function POST(request: Request) {
    //use POST because we will create the quiz data on the backend
    //get the parameters (resource id array)
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);

    const supabaseConnection = createClient();
    const { data: userData } = await supabaseConnection?.auth.getUser();

    //TODO: Proper checks for logged in user
    if (userData) {
        //pull the resources from the database by their id
        const idList = searchParams.getAll(URL_PARAM_RESOURCE_ID);

        try {

            const content = await getCombinedContentFromSpecificResources(idList);

            const generatedLessonPlanData = await generateLessonPlanFromText(content);

            const generatedLessonPlanObject = JSON.parse(generatedLessonPlanData);
            //create a resource entry in the database
            const { data: lessonPlanEntry } = await supabaseConnection.from(TABLE_RESOURCES).insert({ name: generatedLessonPlanObject.name, description: generatedLessonPlanObject.description, type: RESOURCE_TYPE_LESSON_PLAN, value: generatedLessonPlanObject.lesson_plan }).select();

            return new Response(JSON.stringify(lessonPlanEntry));

        }
        catch (error) {
            console.log(error);
        }




    }


    return new Response("POST QUIZ ENDPOINT");
}