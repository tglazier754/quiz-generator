import { QuizQuestion } from "@/types/resourceTypes";

export const updateQuizQuestion = async (quizQuestion: Partial<QuizQuestion>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(quizQuestion));
    const initialFetch = await fetch("/api/quiz_questions", {
        method: "PUT", body: formData
    });
    return await initialFetch.json();
}

export const createNewQuizQuestion = async (quizQuestion: Partial<QuizQuestion>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(quizQuestion));
    const initialFetch = await fetch("/api/quiz_questions", {
        method: "POST", body: formData
    });
    return await initialFetch.json();
}

export const createOrUpdateQuizQuestion = async (quizQuestion: Partial<QuizQuestion>) => {
    if (quizQuestion.id && quizQuestion.id.includes("temp") || !quizQuestion.id)
    {
        delete quizQuestion.id;
        console.log (quizQuestion);
        return createNewQuizQuestion (quizQuestion);
    }
    return updateQuizQuestion (quizQuestion);
}


export const deleteQuizQuestion = async (quizQuestionID: string) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({id:quizQuestionID}));
    const initialFetch = await fetch("/api/quiz_questions", {
        method: "DELETE", body: formData
    });
    return await initialFetch.json();
}