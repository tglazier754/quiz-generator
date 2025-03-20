
import ResourceActionsPanel from "@/components/library/resourceActions";
import { getResourcesByOrigin } from "@/utils/resources/server";
import { Box, Flex, Heading } from "@chakra-ui/react"

import ResourceContextProvider from "@/context/library/provider";
import { Resource } from "@/types/resourceTypes";
import TabbedResourceList from "@/components/resources/resource_list/TabbedResourceList";

const page = async () => {

    const userGeneratedResources = await getResourcesByOrigin("USER");
    const machineGeneratedResources = await getResourcesByOrigin("GENERATED");
    const userGeneratedata = new Map<string, Resource>(Object.entries(JSON.parse(userGeneratedResources)));
    const machineGeneratedata = new Map<string, Resource>(Object.entries(JSON.parse(machineGeneratedResources)));

    //TODO: split out the tab group to fix the scroll layout
    /*
        the tab list scrolls properly, but it includes the height of the title. 
        This is because the 100% height the tab group is using includes it.
        Need to separate the tab list from the tab list using a context to ensure that it 
        is properly accounted for.
    */

    return (
        <ResourceContextProvider>
            <Box
                justifyContent="center"
                direction="column"
                maxHeight="100%"
                minHeight="100%"
                height="100%"
                maxWidth="100%"
                width="100%"
                paddingTop="2rem"
                position="relative">
                <ResourceActionsPanel />
                <Heading fontSize="2xl" textAlign="center">Library</Heading>
                <TabbedResourceList
                    tabData={
                        [{ title: "Inputs", data: userGeneratedata },
                        { title: "Generated Resources", data: machineGeneratedata }]} />
            </Box>
        </ResourceContextProvider >
    )
}

export default page;