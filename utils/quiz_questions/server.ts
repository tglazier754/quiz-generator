
import { SupabaseClient } from "@supabase/supabase-js";
import { TABLE_QUIZ_QUESTIONS } from "@/types/constants";
import { QuizQuestion } from "@/types/resourceTypes";




export const postNewQuizQuestion = async (supabaseInstance: SupabaseClient, quizQuestion: QuizQuestion) => {
    //TODO:Handle errors here
    const { data: userData, error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestion);
        //create the post in the database
        const { data: resourceData } = await supabaseInstance?.from(TABLE_QUIZ_QUESTIONS).insert(quizQuestion).select();

        return resourceData;
    }
    return JSON.stringify({ error: "User not logged in" });
}

export const putExistingQuizQuestion = async (supabaseInstance: SupabaseClient, quizQuestion: QuizQuestion) => {
    const { data: userData, error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestion);
        const { data } = await supabaseInstance?.from(TABLE_QUIZ_QUESTIONS).update(quizQuestion).eq('id', quizQuestion.id).select('*');
        console.log(data);
        return data;
    }
    return JSON.stringify({ error: "User not logged in" });
}