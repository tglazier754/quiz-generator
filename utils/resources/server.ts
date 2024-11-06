"use server";
import { RESOURCE_ORIGIN_USER, RESOURCE_TYPE_QUIZ, TABLE_QUIZ_QUESTIONS, TABLE_RESOURCES, TABLE_USER_RESOURCES } from "@/types/constants";
import { createClient } from "../supabase/server";
import { Resource } from "@/types/resourceTypes";
import { SupabaseClient } from "@supabase/supabase-js";


export const getAllResources = async () => {
    const supabaseConnection = createClient();
    const { data: userData } = await supabaseConnection?.auth.getUser();

    //TODO: Proper checks for logged in user
    if (userData) {
        //offset, count, type v2 - tags

        //const pageOffset = parseInt(searchParams.get(URL_PARAM_OFFSET) as string) || DEFAULT_SELECT_PAGE_OFFSET;
        //const pageSize = parseInt(searchParams.get(URL_PARAM_COUNT) as string) || DEFAULT_PAGE_SIZE;
        //const totalOffset = pageOffset * pageSize;

        //TODO: make sure we use the totalOffset
        const { data } = await supabaseConnection.from(TABLE_RESOURCES).select(`*, quiz_questions(*)`).eq("origin", RESOURCE_ORIGIN_USER);
        console.log(data);
        return JSON.stringify(data);
    }
}

export const getSpecificResources = async (resourceIdList: string[]): Promise<Resource[]> => {
    return new Promise<Resource[]>(async (resolve, reject) => {

        const supabaseConnection = createClient();
        const { data: userData } = await supabaseConnection?.auth.getUser();


        //TODO: Proper checks for logged in user
        if (userData) {
            //offset, count, type v2 - tags

            //const pageOffset = parseInt(searchParams.get(URL_PARAM_OFFSET) as string) || DEFAULT_SELECT_PAGE_OFFSET;
            //const pageSize = parseInt(searchParams.get(URL_PARAM_COUNT) as string) || DEFAULT_PAGE_SIZE;
            //const totalOffset = pageOffset * pageSize;

            //TODO: make sure we use the totalOffset
            const { data, error } = await supabaseConnection.from('resources').select().in('id', resourceIdList);
            if (data) resolve(data);
            if (error) reject(error);

        }
        else {
            reject("Authentication Error");
        }
    });
}


export const getCombinedContentFromSpecificResources = async (resourceIdList: string[]) => {
    return new Promise<string>(async (resolve, reject) => {
        const data = await getSpecificResources(resourceIdList);
        //TODO: Quizzes store their data separately, need to amalgamate the sources.
        const mappedValues = data?.map((resource) => { return resource.value });
        const content = mappedValues?.join(" ");

        resolve(content);
    });
}

export const postNewResource = async (supabaseInstance: SupabaseClient, resource: Resource) => {
    //TODO:Handle errors here
    const { data: userData, error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(resource);
        //create the post in the database
        const { data: resourceData, error: resourceError } = await supabaseInstance?.from(TABLE_RESOURCES).insert(resource).select();
        //get the post's id and add an entry for this user in the user resources table if it succeeded
        if (!resourceError) {
            //TODO: handle errors here
            await supabaseInstance?.from(TABLE_USER_RESOURCES).insert({ user_id: userData.user?.id, resource_id: resourceData[0]?.id }).select();
        }
        return resourceData;
    }
    return JSON.stringify({ error: "User not logged in" });
}

export const putExistingResource = async (supabaseInstance: SupabaseClient, resource: Resource) => {
    const { data } = await supabaseInstance?.from(TABLE_RESOURCES).update(resource).eq('id', resource.id).select();
    return data;
}


export const saveQuizToDatabase = async (quizData: Resource) => {
    return new Promise<Resource[]>(async (resolve, reject) => {
        const supabaseConnection = createClient();
        await supabaseConnection?.auth.getUser();


        if (quizData && quizData.quiz_questions && quizData.quiz_questions.length) {
            const { data: postedResource } = await supabaseConnection.from(TABLE_RESOURCES).insert({ name: quizData.name, description: quizData.description, type: RESOURCE_TYPE_QUIZ }).select();

            //populate the questions table with all of the questions data using that new id
            const id = postedResource && postedResource[0] || "";
            if (postedResource && postedResource[0]) {
                const preppedQuizQuestions = quizData.quiz_questions.map((question: { question: string, answer: string }) => { return { resource_id: id, ...question } })

                await supabaseConnection.from(TABLE_QUIZ_QUESTIONS).insert(preppedQuizQuestions).select();

                const retData = { ...postedResource[0], questions: quizData.quiz_questions };

                resolve(retData);

            }
            else {
                reject("Unable to save quiz resource");
            }
        }
        else {
            reject("There is no data here to save");
        }
    });
}
