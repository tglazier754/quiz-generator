import { QuizQuestion } from "@/types/resourceTypes";

export const sendQuizQuestionUpdate = async (quizQuestion: QuizQuestion) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(quizQuestion));
    const initialFetch = await fetch("/api/quiz_questions", {
        method: "PUT", body: formData
    });
    return await initialFetch.json();
}