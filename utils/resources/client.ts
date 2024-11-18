import { RESOURCE_TYPE_LESSON_PLAN, RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_SUMMARY, URL_PARAM_RESOURCE_ID } from "@/types/constants";


export const generateResource = async (type: string, inputIdList: string[]) => {
    const resourceIdParamArray = inputIdList.map((key) => [URL_PARAM_RESOURCE_ID, key]);
    console.log(type);

    const resourceIdSearchParams = new URLSearchParams(resourceIdParamArray);
    if (type === RESOURCE_TYPE_QUIZ) {
        //TODO: Put this into a server action
        const quizFetch = await fetch("/api/quiz?" + resourceIdSearchParams.toString(), { method: "POST" });
        const quizData = await quizFetch.json();
        console.log(quizData);
        return quizData;
    }
    if (type === RESOURCE_TYPE_LESSON_PLAN) {
        const lessonPlanFetch = await fetch("/api/lesson_plans?" + resourceIdSearchParams.toString(), { method: "POST" });
        const lessonPlanData = await lessonPlanFetch.json();
        console.log(lessonPlanData);
        return lessonPlanData[0];
    }
    if (type === RESOURCE_TYPE_SUMMARY) {

    }
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