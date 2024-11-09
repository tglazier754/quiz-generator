
import ResourceActionsPanel from "@/components/library/resourceActions";
import ResourceList from "@/components/library/resourceList";
import { getAllResources } from "@/utils/resources/server";
import { Box, Heading, HStack } from "@chakra-ui/react"

import ResourceContextProvider from "@/context/resources/provider";
import { Resource, ResourceHash } from "@/types/resourceTypes";

const page = async () => {

    const resources = await getAllResources();
    const data = JSON.parse(resources || "");

    const resourceHashMap: ResourceHash = {};
    data.forEach((resource: Resource) => {
        if (typeof resource.id === 'string') {
            resourceHashMap[resource.id as string] = resource;
            //console.log(resource);
        }
    });

    return (
        <ResourceContextProvider>
            <>
                <HStack className="w-[calc(100vw-1rem)] p-9 h-12 fixed mb-4 t-0 z-10" bg="black" justify="space-between">

                    <Heading fontSize="xl">Library</Heading>
                    <ResourceActionsPanel />
                </HStack>
                <Box className="p-4">

                    <Box className="mt-12">
                        <ResourceList resources={resourceHashMap} />
                    </Box>

                </Box>
            </>
        </ResourceContextProvider >
    )
}

export default page;