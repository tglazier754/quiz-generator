import { ResourceEditorContext } from "@/context/resource_editor/provider";
import { QuizQuestion, Resource } from "@/types/resourceTypes";
import { useContext } from "react";
import { sendQuizQuestionUpdate } from "@/utils/quiz_questions/client";

type useResourceEdit = {
    submitResource: (resource: Resource) => Promise<Resource>;
    updateQuizQuestion: (updatedQuestion: QuizQuestion) => void;
}


export const useResourceEdit = (initialResource?: Resource | null): useResourceEdit => {

    const { quizQuestionChanges, setUploadStatus } = useContext(ResourceEditorContext);

    const uploadResource = async (resource: Resource, method: "POST" | "PUT"): Promise<Resource> => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(resource));
        return new Promise<Resource>(async (resolve, reject) => {

            try {
                const result = await fetch("/api/resources", {
                    method, body: formData
                });
                const returnedResourceList = await result.json();
                setUploadStatus({ status: "success" });
                console.log(returnedResourceList);
                resolve(returnedResourceList[0]);
                //router.push(`/resource?id=${returnedResourceList[0].id}`);
            }
            catch (error) {
                console.log(error);
                setUploadStatus({ status: "error", message: error as string });
                reject(error);
            }
        });
    }

    //TODO: move this over to the client file
    const updateQuizQuestions = async () => {
        const questionUpdatePromises = Object.values(quizQuestionChanges).map((question: QuizQuestion) => {
            return sendQuizQuestionUpdate(question);
        })

        const questionUpdateResult = await Promise.all(questionUpdatePromises);
        return questionUpdateResult;
    }

    const submitResource = async (resource: Resource) => {
        setUploadStatus({ status: "pending" })
        delete resource.quiz_questions;
        const method = initialResource && initialResource.id ? "PUT" : "POST";

        if (method === "PUT") {
            updateQuizQuestions();
        }

        return uploadResource(resource, method);
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