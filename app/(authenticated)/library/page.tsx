
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
                <Box className="w-full fixed z-10">
                    <HStack className="w-[calc(1100px-1rem)] m-auto p-4 pt-9 mb-4 t-0 " bg="black" justify="space-between">

                        <Heading fontSize="2xl">Library</Heading>
                        <ResourceActionsPanel />
                    </HStack>
                </Box>
                <Box className="w-[calc(1100px-1rem)] p-4 m-auto">

                    <Box className="mt-24">
                        <ResourceList resources={data} />
                    </Box>

                </Box>
            </>
        </ResourceContextProvider >
    )
}

export default page;