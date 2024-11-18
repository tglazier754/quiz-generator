import LibraryResourceUploader from "../../../components/image_processor/LibraryResourceUploader";
import { getSpecificResources } from "@/utils/resources/server";


export default async function Page({
    params,
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
            const resourceList = await getSpecificResources(searchIdParams);
            activeResource = resourceList[0];
            console.log(resourceList);
        }
        catch (error) {
            console.log("Error retrieving item");
        }

    }

    return (
        <div>
            <LibraryResourceUploader activeResource={activeResource} />
        </div>
    )

}
