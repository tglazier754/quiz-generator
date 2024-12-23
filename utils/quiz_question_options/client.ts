import { StatusObject } from "@/types/globalTypes";
import { QuizQuestionOption } from "@/types/resourceTypes";

export const updateQuizQuestionOption = async (quizQuestionOption: QuizQuestionOption) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(quizQuestionOption));
    const initialFetch = await fetch("/api/quiz_question_options", {
        method: "PUT", body: formData
    });
    return await initialFetch.json();
}

export const createNewQuizQuestionOption = async (quizQuestionID:string, quizQuestionOption: QuizQuestionOption) => {
    const formData = new FormData();
    quizQuestionOption.quiz_question_id = quizQuestionID;
    console.log (quizQuestionID);
    formData.append("data", JSON.stringify(quizQuestionOption));
    const initialFetch = await fetch("/api/quiz_question_options", {
        method: "POST", body: formData
    });
    return await initialFetch.json();
}

export const createOrUpdateQuizQuestionOption = async (quizQuestionID:string, quizQuestionOption: QuizQuestionOption) => {
    console.log (quizQuestionOption);
    if (quizQuestionOption.id && quizQuestionOption.id.includes("temp") || !quizQuestionOption.id)
    {
        delete quizQuestionOption.id;
        console.log ("------UPDATE SINGLE------");
        console.log (quizQuestionOption);
        return createNewQuizQuestionOption (quizQuestionID, quizQuestionOption);
    }
    return updateQuizQuestionOption (quizQuestionOption);
}

export const createOrUpdateMultipleQuizQuestionOptions = async (quizQuestionID:string, quizQuestionOptions: QuizQuestionOption[]):Promise<StatusObject<QuizQuestionOption[]>> => {
    console.log ("------UPDATE ALL OPTIONS--------")
    const promises = quizQuestionOptions.map ((option) => {return createOrUpdateQuizQuestionOption (quizQuestionID, option)});
    try {
        const val = await Promise.all (promises);
        return {status:"success", value:val};
    }
    catch {
        return {status:"error", message:"Unable to update question options"}
    }
}

export const deleteQuizQuestionOption = async (quizQuestionOptionID: string) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({id:quizQuestionOptionID}));
    const initialFetch = await fetch("/api/quiz_question_options", {
        method: "DELETE", body: formData
    });
    return await initialFetch.json();
}