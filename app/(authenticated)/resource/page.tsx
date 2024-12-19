import ResourceEditorContextProvider from "@/context/resource_editor/provider";
import { getSpecificResources } from "@/utils/resources/server";
import LibraryResourceUploaderContainer from "@/components/image_processor/LibraryResourceUploaderContainer";


export default async function Page({
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    //check for a provided id
    const searchParamsAwait = await searchParams;
    const providedIdList = searchParamsAwait["id"];
    let activeResource;
    if (providedIdList) {
        const searchIdParams: string[] = typeof providedIdList === "string" ? [providedIdList] : providedIdList as string[];

        const { status, value: resourceList, message } = await getSpecificResources(searchIdParams);
        if (status !== "error" && resourceList) {
            activeResource = resourceList[0];
            console.log(resourceList);
        }
        else {
            console.log(message);
        }

    }

    return (

        <ResourceEditorContextProvider>
            <LibraryResourceUploaderContainer activeResource={activeResource} />

        </ResourceEditorContextProvider>
    )

}
