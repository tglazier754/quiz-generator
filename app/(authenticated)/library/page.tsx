
import ResourceActionsPanel from "@/components/library/resourceActions";
import { getResourcesByOrigin } from "@/utils/resources/server";
import { Box, Flex, Heading, HStack } from "@chakra-ui/react"

import ResourceContextProvider from "@/context/library/provider";
import { Resource } from "@/types/resourceTypes";
import TabbedResourceList from "@/components/resources/resource_list/TabbedResourceList";

const page = async () => {

    const userGeneratedResources = await getResourcesByOrigin("USER");
    const machineGeneratedResources = await getResourcesByOrigin("GENERATED");
    const userGeneratedata = new Map<string, Resource>(Object.entries(JSON.parse(userGeneratedResources)));
    const machineGeneratedata = new Map<string, Resource>(Object.entries(JSON.parse(machineGeneratedResources)));

    console.log(Object.entries(JSON.parse(userGeneratedResources)).length);
    console.log(userGeneratedata.entries());

    return (
        <ResourceContextProvider>
            <Flex
                justifyContent="center"
                direction="column"
                maxHeight="100%"
                height="100%"
                maxWidth="100%"
                width="100%">
                <ResourceActionsPanel />
                <Box className="w-full z-10 flex-grow-0">
                    <HStack className="m-auto p-4 pt-9" justify="flex-start">

                        <Heading fontSize="2xl">Library</Heading>

                    </HStack>
                </Box>
                <Box className="p-4 m-auto flex-grow" overflowY="auto">

                    <Box>
                        <TabbedResourceList
                            tabData={
                                [{ title: "Inputs", data: userGeneratedata },
                                { title: "Generated Resources", data: machineGeneratedata }]} />
                    </Box>

                </Box>
            </Flex>
        </ResourceContextProvider>
    )
}

export default page;