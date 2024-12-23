import {  QuizQuestionOption } from "@/types/resourceTypes";
import { useState } from "react";
import { StatusObject } from "@/types/globalTypes";
import { createOrUpdateQuizQuestionOption, deleteQuizQuestionOption } from "@/utils/quiz_question_options/client";


export const useQuizQuestionOptionUpdate = () => {
    const [uploadStatus, setUploadStatus] = useState<StatusObject>({ status: "uninitialized", message: null });

    const removeQuizQuestionOption = async (quizQuestionOptionID:string) => {
        setUploadStatus({ status: "pending" });

        const deleteQuizQuestionResponse = await deleteQuizQuestionOption (quizQuestionOptionID);
        setUploadStatus(deleteQuizQuestionResponse);
    }

    const uploadQuizQuestionOption = async (quizQuestionID:string, quizQuestionOption:QuizQuestionOption) => {
        setUploadStatus ({status:"pending"});

        const uploadQuizQuestionOptionResponse = await createOrUpdateQuizQuestionOption (quizQuestionID, quizQuestionOption);
        setUploadStatus(uploadQuizQuestionOptionResponse);
    }

    const resetUploadStatus = () => {
        setUploadStatus ({ status: "uninitialized", message: null });
    }

    return {
        uploadStatus,
        uploadQuizQuestionOption,
        removeQuizQuestionOption,
        resetUploadStatus,
    }
}