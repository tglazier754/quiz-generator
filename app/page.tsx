
import React from "react";
import { Flex } from "@chakra-ui/react";
import ResourceList from "@/components/resources/resourceList";
import { getResources } from "@/utils/resources/server";
import LibraryResourceUploader from "@/components/image_processor/LibraryResourceUploader";
import ResourceActionsPanel from "@/components/resources/actions/resourceActionsPanel";
import ResourceContextProvider from "@/context/resources/provider";


type PageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const page = async (props: PageProps) => {
    const { searchParams } = props;
    console.log(searchParams);

    const resources = await getResources();
    const data = JSON.parse(resources || "");

    return (
        <ResourceContextProvider>
            <div className="w-full h-full overflow-hidden p-4">
                <Flex className="h-full">
                    <div className="w-1/3 border-solid">
                        <ResourceList resources={data} />
                    </div>
                    <div>
                        <div className="h-1/6">
                            <ResourceActionsPanel />
                        </div>
                        <div className="h-5/6">
                            <LibraryResourceUploader />
                        </div>
                    </div>
                </Flex>

            </div>
        </ResourceContextProvider>
    )
}


export default page;