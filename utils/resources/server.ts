"use server";
import { RESOURCE_TYPE_QUIZ, TABLE_QUIZ_QUESTION_OPTIONS, TABLE_QUIZ_QUESTIONS, TABLE_RESOURCES, TABLE_USER_RESOURCES } from "@/types/constants";
import { createClient } from "../supabase/server";
import { Resource } from "@/types/resourceTypes";
import { SupabaseClient } from "@supabase/supabase-js";
import { convertObjectArrayToHashMap } from "../global";
import { QuizFormat, QuizQuestion } from "../quiz/server";
import { StatusObject } from "@/types/globalTypes";


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

export const getSpecificResources = async (resourceIdList: string[]): Promise<StatusObject<Resource[]>> => {
    return new Promise<StatusObject<Resource[]>>(async (resolve, reject) => {

        const supabaseConnection = createClient();
        const { data: userData } = await supabaseConnection?.auth.getUser();


        //TODO: Proper checks for logged in user
        if (userData) {
            //offset, count, type v2 - tags

            //const pageOffset = parseInt(searchParams.get(URL_PARAM_OFFSET) as string) || DEFAULT_SELECT_PAGE_OFFSET;
            //const pageSize = parseInt(searchParams.get(URL_PARAM_COUNT) as string) || DEFAULT_PAGE_SIZE;
            //const totalOffset = pageOffset * pageSize;

            //TODO: make sure we use the totalOffset
            const { data, error } = await supabaseConnection
                .from('resources')
                .select(`*, 
                quiz_questions:quiz_questions!resource_id(*,quiz_question_options(*))`).in('id', resourceIdList).returns<Resource[]>();
            if (data) resolve({status:"success", value:data});
            if (error) reject({status:"error", message:error.message});

        }
        else {
            reject({status:"error", message:"Authentication Error"});
        }
    });
}

//TODO: Convert to StatusObject
export const getCombinedContentFromSpecificResources = async (resourceIdList: string[]) => {
    return new Promise<string>(async (resolve, reject) => {
        const {status, value} = await getSpecificResources(resourceIdList);
        if (status === "error")
        {
            reject ("");
        }
        //TODO: Quizzes store their data separately, need to amalgamate the sources.
        const mappedValues = value?.map((resource) => { return resource.value });
        const content = mappedValues?.join(" ") || "";

        resolve(content);
    });
}

export const postNewResource = async (supabaseInstance: SupabaseClient, resource: Resource):Promise<StatusObject<Resource[]>> => {
    //TODO:Handle errors here
    const { data: userData, error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        //console.log(resource);
        //create the post in the database
        const { data: resourceData, error: resourceError } = await supabaseInstance?.from(TABLE_RESOURCES).insert(resource).select(`*, quiz_questions(*)`);
        //get the post's id and add an entry for this user in the user resources table if it succeeded
        if (!resourceError) {
            //TODO: handle errors here
            await supabaseInstance?.from(TABLE_USER_RESOURCES).insert({ user_id: userData.user?.id, resource_id: resourceData[0]?.id }).select();
        }
        return {status:"success", value:resourceData};
    }
    return { status:"error", message:"User not logged in" };
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


export const saveQuizToDatabase = async (quizData: QuizFormat):Promise<Resource[]> => {
    return new Promise<Resource[]>(async (resolve, reject) => {
        const supabaseConnection = createClient();
        const { data: userData } = await supabaseConnection?.auth.getUser();


        if (quizData && quizData && quizData.questions && quizData.questions.length) {
            //console.log(quizData);
            //create a new quiz resource that we can associate the questions to
            const { data: postedResource, error: postedResourceError } = await supabaseConnection.from(TABLE_RESOURCES).insert({ name: quizData.name, description: quizData.description, expected_duration: quizData.duration, type: RESOURCE_TYPE_QUIZ }).select();
            console.log(postedResource);
            console.log(postedResourceError);
            //populate the questions table with all of the questions data using that new id
            const id = postedResource && postedResource[0].id || "";
            if (postedResource && postedResource[0]) {

                //TODO: Check for success here

                //create the connection between the uploader and the resource
                await supabaseConnection.from(TABLE_USER_RESOURCES).insert({ user_id: userData.user?.id, resource_id: id });


                //split out multiple choice from the rest before doing the bulk insert
                const bulkQuestions = quizData.questions.filter((value) => { return value.type.toLowerCase() !== "multiple_choice" });
                console.log(bulkQuestions);
                const multipleChoiceQuestions = quizData.questions.filter((value) => { return value.type.toLowerCase() === "multiple_choice" });
                console.log(multipleChoiceQuestions);
                const bulkQuestionSave = await saveQuizQuestionsToDatabase(supabaseConnection, id, bulkQuestions);
                console.log(bulkQuestionSave);
                const multipleChoiceQuestionsSave = await saveMultipleChoiceQuestionsToDatabase(supabaseConnection, id, multipleChoiceQuestions);
                console.log(multipleChoiceQuestionsSave);

                //return the new resource object
                resolve([{ ...postedResource[0], id: id } as Resource]);

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


export const saveQuizQuestionsToDatabase = async (dbConnection: SupabaseClient, quizId: string, questions: QuizQuestion[]) => {

    const preppedQuizQuestions = questions.map((question: QuizQuestion) => { return { resource_id: quizId, ...question } })

    const insertedQuestions = await dbConnection.from(TABLE_QUIZ_QUESTIONS).insert(preppedQuizQuestions).select();

    return insertedQuestions;
}

export const saveMultipleChoiceQuestionsToDatabase = async (dbConnection: SupabaseClient, quizId: string, questions: QuizQuestion[]) => {

    const promises: Promise<any>[] = [];
    questions.forEach(async (question) => {
        promises.push(saveMultipleChoiceQuestionToDatabase(dbConnection, quizId, question));
    })

    return Promise.all(promises);

}

export const saveMultipleChoiceQuestionToDatabase = async (dbConnection: SupabaseClient, quizId: string, question: QuizQuestion) => {

    console.log(quizId);
    console.log({ resource_id: quizId, ...question });
    const inputQuestion = { resource_id: quizId, ...question };
    delete inputQuestion.options;

    const { data: insertedQuestion } = await dbConnection.from(TABLE_QUIZ_QUESTIONS).insert(inputQuestion).select();
    const id = insertedQuestion && insertedQuestion[0].id || "";

    const preppedQuestionOptions = question.options?.map((value, index) => { return { quiz_question_id: id, order: index, value } });

    const insertedQuestionOptions = await dbConnection.from(TABLE_QUIZ_QUESTION_OPTIONS).insert(preppedQuestionOptions).select();
    return insertedQuestionOptions;
}