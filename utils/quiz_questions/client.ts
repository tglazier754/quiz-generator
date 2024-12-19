import { QuizQuestion } from "@/types/resourceTypes";

export const sendQuizQuestionUpdate = (quizQuestion: QuizQuestion) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(quizQuestion));
    return fetch("/api/quiz_questions", {
        method: "PUT", body: formData
    })
}