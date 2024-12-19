
import { SupabaseClient } from "@supabase/supabase-js";
import { TABLE_QUIZ_QUESTIONS } from "@/types/constants";
import { QuizQuestion } from "@/types/resourceTypes";
import { StatusObject } from "@/types/globalTypes";




export const postNewQuizQuestion = async (supabaseInstance: SupabaseClient, quizQuestion: QuizQuestion): Promise<StatusObject<QuizQuestion>> => {
    const { data: userData, error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestion);
        const { data: resourceData } = await supabaseInstance?.from(TABLE_QUIZ_QUESTIONS).insert(quizQuestion).select().returns<QuizQuestion>();

        return { status: "success", value: resourceData };
    }
    return { status: "error", message: "User not logged in" };
}

export const putExistingQuizQuestion = async (supabaseInstance: SupabaseClient, quizQuestion: QuizQuestion): Promise<StatusObject<QuizQuestion>> => {
    const { data: userData, error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestion);
        const { data } = await supabaseInstance?.from(TABLE_QUIZ_QUESTIONS).update(quizQuestion).eq('id', quizQuestion.id).select('*').returns<QuizQuestion>();
        console.log(data);
        return { status: "success", value: data };
    }
    return { status: "error", message: "Unauthenticated" };
}