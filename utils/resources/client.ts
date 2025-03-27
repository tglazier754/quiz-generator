import { RESOURCE_TYPE_LESSON_PLAN, RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_SUMMARY, URL_PARAM_RESOURCE_ID } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";

export type ResourceType = "QUIZ" | "LESSON_PLAN";

export type ResourceGenerationParams = {
    content_type: ResourceType;
    grade_level: string;
    expected_duration: number | null;
    true_false_count?: number | null;
    multiple_choice_count?: number | null;
    short_answer_count?: number | null;
    long_form_count?: number | null;
}
//use a hook to wrap this that includes status
export const generateResource = async (params: ResourceGenerationParams, inputIdList: string[]) => {
    console.log("GENERATE");
    const { content_type } = params;
    const resourceIdParamArray = inputIdList.map((key) => [URL_PARAM_RESOURCE_ID, key]);
    console.log(content_type);
    console.log(params);

    const resourceIdSearchParams = new URLSearchParams(resourceIdParamArray);
    if (content_type === RESOURCE_TYPE_QUIZ) {
        //TODO: Put this into a server action
        console.log("QUIZ GENERATION");
        const quizFetch = await fetch("/api/quiz?" + resourceIdSearchParams.toString(), { method: "POST", body: JSON.stringify(params) });
        const quizData = await quizFetch.json();
        console.log(quizData);
        return quizData;
    }
    if (content_type === RESOURCE_TYPE_LESSON_PLAN) {
        const lessonPlanFetch = await fetch("/api/lesson_plans?" + resourceIdSearchParams.toString(), { method: "POST", body: JSON.stringify(params) });
        const lessonPlanData = await lessonPlanFetch.json();
        console.log(lessonPlanData);
        return lessonPlanData[0];
    }
    if (content_type === RESOURCE_TYPE_SUMMARY) {

    }
}

export const updateResource = async (resource: Partial<Resource>) => {
    const formData = new FormData();
    console.log (resource);
    formData.append("data", JSON.stringify(resource));
    const initialFetch = await fetch("/api/resources", {
        method: "PUT", body: formData
    });
    return await initialFetch.json();
}


export const archiveSingleResource = async (resourceId: string) => {
    return fetch("/api/resources/archive/" + resourceId, { method: "PUT" });
}

export const archiveMultipleResources = async (resourceIdList: string[]) => {
    const promiseArr = resourceIdList.map((id) => {
        return archiveSingleResource(id);
    });
    return Promise.all(promiseArr);
}


