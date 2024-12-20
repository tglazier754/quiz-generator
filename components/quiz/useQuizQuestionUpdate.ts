import { QuizQuestion } from "@/types/resourceTypes";
import { useState } from "react";
import { StatusObject } from "@/types/globalTypes";
import { sendQuizQuestionUpdate } from "@/utils/quiz_questions/client";


export const useQuizQuestionUpdate = () => {
    const [uploadStatus, setUploadStatus] = useState<StatusObject>({ status: "uninitialized", message: null });

    const updateQuizQuestion = async (updatedValues:QuizQuestion) => {
        setUploadStatus({ status: "pending" });
        //remove the quiz questions, update them separately
        //const quizQuestionOptions = updatedValues.quiz_question_options;
        delete updatedValues.quiz_question_options;
        const updateResponse = await sendQuizQuestionUpdate (updatedValues);
        setUploadStatus(updateResponse);
    }

    return {
        uploadStatus,
        updateQuizQuestion
    }
}