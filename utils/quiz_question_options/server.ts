
import { SupabaseClient } from "@supabase/supabase-js";
import { TABLE_QUIZ_QUESTION_OPTIONS } from "@/types/constants";
import { QuizQuestionOption } from "@/types/resourceTypes";
import { StatusObject } from "@/types/globalTypes";




export const postNewQuizQuestionOption = async (supabaseInstance: SupabaseClient, quizQuestionOption: QuizQuestionOption): Promise<StatusObject<QuizQuestionOption>> => {
    const { error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestionOption);
        const { data: resourceData, error:resourceError } = await supabaseInstance?.from(TABLE_QUIZ_QUESTION_OPTIONS).insert(quizQuestionOption).select().returns<QuizQuestionOption>();

        if (resourceError) return {status:"error", message:resourceError.message};
        return { status: "success", value: resourceData };
    }
    return { status: "error", message: "User not logged in" };
}

export const putExistingQuizQuestionOption = async (supabaseInstance: SupabaseClient, quizQuestionOption: QuizQuestionOption): Promise<StatusObject<QuizQuestionOption>> => {
    const { error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestionOption);
        const { data: resourceData, error:resourceError } = await supabaseInstance?.from(TABLE_QUIZ_QUESTION_OPTIONS).update(quizQuestionOption).eq('id', quizQuestionOption.id).select('*').returns<QuizQuestionOption>();
        console.log(resourceData);
        if (resourceError) return {status:"error", message:resourceError.message};
        return { status: "success", value: resourceData };
    }
    return { status: "error", message: "Unauthenticated" };
}

export const deleteExistingQuizQuestionOption = async (supabaseInstance: SupabaseClient, quizQuestionOption:{id:string}): Promise<StatusObject<string>> => {
    const { error: userError } = await supabaseInstance.auth.getUser();
    if (!userError) {
        console.log(quizQuestionOption);
        const { data: resourceData, error:resourceError } = await supabaseInstance?.from(TABLE_QUIZ_QUESTION_OPTIONS).delete().eq('id', quizQuestionOption.id);
        console.log(resourceData);
        console.log(resourceError);
        if (resourceError) return {status:"error", message:resourceError.message};
        return { status: "success", value: quizQuestionOption.id };
    }
    return { status: "error", message: "Unauthenticated" };
}