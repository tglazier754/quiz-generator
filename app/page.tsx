
import React from "react";
import UrlInput from "../components/userInput/urlInput";
import { Flex, Text } from "@chakra-ui/react";
import ResourceList from "@/components/resources/resourceList";
import { getResources } from "@/utils/resources/server";


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
        <div className="w-full h-full overflow-hidden p-4">
            <Flex className="h-full">
                <div className="w-1/3 border-solid">
                    <ResourceList resources={data} />
                </div>
                <div>
                    <Text>Right</Text>
                </div>
            </Flex>

        </div>
    )
}


export default page;