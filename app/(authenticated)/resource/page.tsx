import ResourceEditorContextProvider from "@/context/resource_editor/provider";
import { getSpecificResources } from "@/utils/resources/server";
import { Resource } from "@/types/resourceTypes";
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
        try {
            const resourceList: Resource[] = await getSpecificResources(searchIdParams);
            activeResource = resourceList[0];
            console.log(resourceList);
        }
        catch (error) {
            console.log("Error retrieving item");
            console.log(error);
        }

    }

    return (

        <ResourceEditorContextProvider>
            <LibraryResourceUploaderContainer activeResource={activeResource} />

        </ResourceEditorContextProvider>
    )

}
