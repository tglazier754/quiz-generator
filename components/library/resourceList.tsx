"use client";
import { Resource } from "@/types/resourceTypes";
import { Box, Center, Heading, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import ResourceCard from "./resourceCard";
import { ResourcesContext } from "@/context/resources/provider";
import { useContext } from "react";
import { ResourceHash } from "@/types/resourceTypes";
import { useSelectResources } from "@/hooks/useSelectResources";

type ResourceListProps = {
    resources: ResourceHash;
}
export const ResourceList = (props: ResourceListProps) => {
    const { resources } = props;
    const { resourceMap, setResourceMap, isGenerating } = useContext(ResourcesContext);

    const { selectedResources, selectionHandler } = useSelectResources();

    setResourceMap(resources);
    //on edit, send the list of selected id's

    return (
        <Box className="max-w-full w-full h-full max-h-full p-4">
            {!Object.keys(resources).length ?
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center">
                    <Heading size="2xl">No resources to display.</Heading>
                </Stack> : ""}

            <SimpleGrid minChildWidth="14rem" gap="2rem" className="max-w-full w-full " >
                {Object.values(resourceMap).map((resource: Resource) => {
                    return (
                        <div key={`resource-preview-${resource.id}`} className="resource-preview">
                            <ResourceCard resource={resource} selected={resource.id && selectedResources[resource.id] ? true : false} onSelectHandler={selectionHandler} />
                        </div>
                    )
                })}
            </SimpleGrid>
            {isGenerating ? <Box zIndex={100000000} pos="absolute" inset="0" bg="bg/80">
                <Center h="full">
                    <Spinner color="teal.500" />
                </Center>
            </Box> : null}
        </Box>
    )
}

export default ResourceList;