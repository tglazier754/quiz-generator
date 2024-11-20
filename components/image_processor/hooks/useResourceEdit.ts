import { ResourceEditorContext } from "@/context/resource_editor/provider";
import { QuizQuestion, Resource } from "@/types/resourceTypes";
import { useContext } from "react";
import { useActionStatus } from "./useActionStatus";
import { sendQuizQuestionUpdate } from "@/utils/quiz_questions/client";


type useResourceEdit = {
    submitResource: (resource: Resource) => void;
    updateQuizQuestion: (updatedQuestion: QuizQuestion) => void;
}


export const useResourceEdit = (initialResource?: Resource | null): useResourceEdit => {

    const { quizQuestionChanges } = useContext(ResourceEditorContext);

    const { setUploadStatus } = useActionStatus();



    const uploadResource = async (resource: Resource, method: "POST" | "PUT") => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(resource));


        try {
            const result = await fetch("/api/resources", {
                method, body: formData
            });
            const returnedResource = await result.json();
            setUploadStatus({ status: "success" })
            console.log(returnedResource);
            //redirect to this same page but with the generated id
            /*if (imageSelectorRef.current) {
                imageSelectorRef.current.files = null;
                imageSelectorRef.current.value = "";
            }*/
        }
        catch (error) {
            console.log(error);
            setUploadStatus({ status: "success" })
        }
    }

    //TODO: move this over to the client file
    const updateQuizQuestions = async () => {
        const questionUpdatePromises = Object.values(quizQuestionChanges).map((question: QuizQuestion) => {
            return sendQuizQuestionUpdate(question);
        })

        const questionUpdateResult = await Promise.all(questionUpdatePromises);
        return questionUpdateResult;
    }

    //TODO: Move this to the client file
    const submitResource = async (resource: Resource) => {
        setUploadStatus({ status: "pending" })
        delete resource.quiz_questions;
        const method = initialResource && initialResource.id ? "PUT" : "POST";

        if (method === "PUT") {
            updateQuizQuestions();
        }

        await uploadResource(resource, method);
    }

    //TODO: Move this to the client file
    const updateQuizQuestion = (updatedQuestion: QuizQuestion) => {
        //TODO: remove the item from the changes list if there is no delta
        if (updatedQuestion && updatedQuestion.id) {
            quizQuestionChanges[updatedQuestion.id] = updatedQuestion;
        }
    }

    return { submitResource, updateQuizQuestion };

}