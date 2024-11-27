
import ResourceActionsPanel from "@/components/library/resourceActions";
import { getAllResources } from "@/utils/resources/server";
import { Box, Flex, Heading, HStack } from "@chakra-ui/react"

import ResourceContextProvider from "@/context/library/provider";
import ResourceListContainer from "@/components/library/resourceListContainer";
import { Resource } from "@/types/resourceTypes";

const page = async () => {

    const resources = await getAllResources();
    const data = new Map<string, Resource>(Object.entries(JSON.parse(resources)));

    return (
        <ResourceContextProvider>
            <Flex
                justifyContent="center"
                direction="column"
                maxHeight="100%"
                height="100%"
                maxWidth="100%"
                width="100%">
                <Box className="w-full z-10 flex-grow-0">
                    <HStack className="m-auto p-4 pt-9" justify="space-between">

                        <Heading fontSize="2xl">Library</Heading>
                        <ResourceActionsPanel />
                    </HStack>
                </Box>
                <Box className="p-4 m-auto flex-grow" overflowY="auto">

                    <Box>
                        <ResourceListContainer resourceMap={data} />
                    </Box>

                </Box>
            </Flex>
        </ResourceContextProvider >
    )
}

export default page;