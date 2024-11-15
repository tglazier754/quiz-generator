
import React from "react";
import { Flex } from "@chakra-ui/react";
import { getAllResources } from "@/utils/resources/server";
import ResourceContextProvider from "@/context/resources/provider";


type PageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const page = async (props: PageProps) => {
    const { searchParams } = props;
    console.log(searchParams);

    const resources = await getAllResources();
    const data = JSON.parse(resources || "");
    console.log(data);

    return (
        <ResourceContextProvider>
            <div className="w-full h-full overflow-hidden p-4">
                <Flex className="h-full">
                    <div className="w-1/3 border-solid">
                    </div>
                    <div>
                        <div className="h-1/6">
                        </div>
                        <div className="h-5/6">

                        </div>
                    </div>
                </Flex>

            </div>
        </ResourceContextProvider>
    )
}


export default page;