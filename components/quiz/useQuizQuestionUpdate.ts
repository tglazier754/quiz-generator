import { QuizQuestion } from "@/types/resourceTypes";
import { useState } from "react";
import { StatusObject } from "@/types/globalTypes";
import { createOrUpdateQuizQuestion } from "@/utils/quiz_questions/client";
import { createOrUpdateMultipleQuizQuestionOptions } from "@/utils/quiz_question_options/client";


export const useQuizQuestionUpdate = () => {
    const [uploadStatus, setUploadStatus] = useState<StatusObject>({ status: "uninitialized", message: null });

    const updateQuizQuestion = async (updatedValues:Partial<QuizQuestion>) => {
        setUploadStatus({ status: "pending" });
        //remove the quiz questions, update them separately
        const quizQuestionOptions = updatedValues.quiz_question_options;
        delete updatedValues.quiz_question_options;
        const updateQuestionResponse = await createOrUpdateQuizQuestion (updatedValues);
        if (updateQuestionResponse.status === "error"){
            setUploadStatus(updateQuestionResponse);
            return updateQuestionResponse;
        }
        else {
            if (quizQuestionOptions && Array.isArray(quizQuestionOptions)){
                console.log (updateQuestionResponse.value[0].id)
                const updateQuizQuestionOptions = await createOrUpdateMultipleQuizQuestionOptions(updateQuestionResponse.value[0].id, quizQuestionOptions);
                const updatedOptions = updateQuizQuestionOptions.value && updateQuizQuestionOptions.value.map ((statusObject) => {return statusObject.value[0]});
                const updatedBody = {...updateQuestionResponse.value[0], quiz_question_options: updatedOptions}
                setUploadStatus({status:updateQuizQuestionOptions.status, value:updatedBody});
                return {status:updateQuizQuestionOptions.status, value:updatedBody};
            }
            else {
                setUploadStatus(updateQuestionResponse);
                return updateQuestionResponse;
            }
            
        }
    }

    const resetUploadStatus = () => {
        setUploadStatus ({ status: "uninitialized", message: null });
    }

    return {
        uploadStatus,
        updateQuizQuestion,
        resetUploadStatus,
    }
}