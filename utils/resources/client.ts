import { URL_PARAM_RESOURCE_ID } from "@/types/constants";


export const generateResource = async (inputIdList: string[]) => {
    const resourceIdParamArray = inputIdList.map((key) => [URL_PARAM_RESOURCE_ID, key]);

    const resourceIdSearchParams = new URLSearchParams(resourceIdParamArray);
    const quizFetch = await fetch("/api/quiz?" + resourceIdSearchParams.toString(), { method: "POST" });
    const quizData = await quizFetch.json();
    console.log(quizData);
    return quizData;
    //TODO: put the returned quizData into a useContext container to be displayed
}