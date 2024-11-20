
import ResourceActionsPanel from "@/components/library/resourceActions";
import ResourceList from "@/components/library/resourceList";
import { getAllResources } from "@/utils/resources/server";
import { Box, Heading, HStack } from "@chakra-ui/react"

import ResourceContextProvider from "@/context/library/provider";

const page = async () => {

    const resources = await getAllResources();
    const data = JSON.parse(resources);

    return (
        <ResourceContextProvider>
            <>
                <HStack className="w-[calc(100vw-1rem)] p-9 h-12 fixed mb-4 t-0 z-10" bg="black" justify="space-between">

                    <Heading fontSize="2xl">Library</Heading>
                    <ResourceActionsPanel />
                </HStack>
                <Box className="p-4">

                    <Box className="mt-12">
                        <ResourceList resources={data} />
                    </Box>

                </Box>
            </>
        </ResourceContextProvider >
    )
}

export default page;