"use server";
import { RESOURCE_TYPE_QUIZ, TABLE_QUIZ_QUESTIONS, TABLE_RESOURCES, TABLE_USER_RESOURCES } from "@/types/constants";
import { createClient } from "../supabase/server";
import { Resource } from "@/types/resourceTypes";
import { SupabaseClient } from "@supabase/supabase-js";
import { convertObjectArrayToHashMap } from "../global";


export const getAllResources = async () => {
    const supabaseConnection = createClient();
    const { data: userData } = await supabaseConnection?.auth.getUser();

    //TODO: Proper checks for logged in user
    if (userData && userData.user) {
        //offset, count, type v2 - tags

        //const pageOffset = parseInt(searchParams.get(URL_PARAM_OFFSET) as string) || DEFAULT_SELECT_PAGE_OFFSET;
        //const pageSize = parseInt(searchParams.get(URL_PARAM_COUNT) as string) || DEFAULT_PAGE_SIZE;
        //const totalOffset = pageOffset * pageSize;

        //TODO: make sure we use the totalOffset
        const { data } = await supabaseConnection.from(TABLE_RESOURCES).select(`*, quiz_questions(*), user_resources!inner(user_id)`).eq("user_resources.user_id", userData.user.id);
        if (data) {
            return JSON.stringify(convertObjectArrayToHashMap(data));
        }
        return (JSON.stringify({}));
    }
    return (JSON.stringify({}));
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
            const { data, error } = await supabaseConnection.from('resources').select(`*, quiz_questions(*)`).in('id', resourceIdList);
            if (data) resolve(data);
            if (error) reject(error);

        }
        else {
            reject("Authentication Error");
        }
    });
}


export const getCombinedContentFromSpecificResources = async (resourceIdList: string[]) => {
    return new Promise<string>(async (resolve) => {
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
        //console.log(resource);
        //create the post in the database
        const { data: resourceData, error: resourceError } = await supabaseInstance?.from(TABLE_RESOURCES).insert(resource).select(`*, quiz_questions(*)`);
        //get the post's id and add an entry for this user in the user resources table if it succeeded
        if (!resourceError) {
            //TODO: handle errors here
            await supabaseInstance?.from(TABLE_USER_RESOURCES).insert({ user_id: userData.user?.id, resource_id: resourceData[0]?.id }).select(`*, quiz_questions(*)`);
        }
        return resourceData;
    }
    return JSON.stringify({ error: "User not logged in" });
}

export const putExistingResource = async (supabaseInstance: SupabaseClient, resource: Resource) => {
    const { data } = await supabaseInstance?.from(TABLE_RESOURCES).update(resource).eq('id', resource.id).select(`*, quiz_questions(*)`);
    return data;
}

export const archiveExistingResource = async (supabaseInstance: SupabaseClient, resourceId: string) => {
    console.log(resourceId);
    const { data, error } = await supabaseInstance?.from(TABLE_RESOURCES).update({ archived: true }).eq('id', resourceId).select('*');
    console.log(data);
    console.log(error);
    return data;
}


export const saveQuizToDatabase = async (quizData: Resource) => {
    return new Promise<Resource[]>(async (resolve, reject) => {
        const supabaseConnection = createClient();
        const { data: userData } = await supabaseConnection?.auth.getUser();


        if (quizData && quizData.quiz_questions && quizData.quiz_questions.length) {
            const { data: postedResource } = await supabaseConnection.from(TABLE_RESOURCES).insert({ name: quizData.name, description: quizData.description, type: RESOURCE_TYPE_QUIZ }).select();

            //populate the questions table with all of the questions data using that new id
            const id = postedResource && postedResource[0].id || "";
            if (postedResource && postedResource[0]) {

                //TODO: Check for success here
                await supabaseConnection.from(TABLE_USER_RESOURCES).insert({ user_id: userData.user?.id, resource_id: id });
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
