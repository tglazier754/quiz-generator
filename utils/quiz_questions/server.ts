
import { SupabaseClient } from "@supabase/supabase-js";
import { TABLE_QUIZ_QUESTIONS } from "@/types/constants";
import { QuizQuestion } from "@/types/resourceTypes";
import { StatusObject } from "@/types/globalTypes";




export const postNewQuizQuestion = async (supabaseInstance: SupabaseClient, quizQuestion: QuizQuestion): Promise<StatusObject<QuizQuestion>> => {
    const { error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestion);
        const { data: resourceData, error:resourceError } = await supabaseInstance?.from(TABLE_QUIZ_QUESTIONS).insert(quizQuestion).select().returns<QuizQuestion>();

        if (resourceError) return {status:"error", message:resourceError.message};
        return { status: "success", value: resourceData };
    }
    return { status: "error", message: "User not logged in" };
}

export const putExistingQuizQuestion = async (supabaseInstance: SupabaseClient, quizQuestion: QuizQuestion): Promise<StatusObject<QuizQuestion>> => {
    const { error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestion);
        const { data: resourceData, error:resourceError } = await supabaseInstance?.from(TABLE_QUIZ_QUESTIONS).update(quizQuestion).eq('id', quizQuestion.id).select('*').returns<QuizQuestion>();
        console.log(resourceData);
        if (resourceError) return {status:"error", message:resourceError.message};
        return { status: "success", value: resourceData };
    }
    return { status: "error", message: "Unauthenticated" };
}