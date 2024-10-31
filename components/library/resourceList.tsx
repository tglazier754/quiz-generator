"use client";
import { Resource } from "@/types/resourceTypes";
import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import ResourceCard from "./resourceCard";
import { ResourcesContext } from "@/context/resources/provider";
import { useContext } from "react";

type ResourceListProps = {
    resources: Resource[];
}
export const ResourceList = (props: ResourceListProps) => {
    const { resources } = props;
    const { isGenerating, selectedResources, setSelectedResources } = useContext(ResourcesContext);

    //on edit, send the list of selected id's
    const selectionHandler = (selectedId: string, state: boolean) => {
        const selectedResourcesTemp = JSON.parse(JSON.stringify(selectedResources));
        if (state) {
            selectedResourcesTemp[selectedId] = state;
        }
        else {
            delete selectedResourcesTemp[selectedId];
        }
        setSelectedResources(selectedResourcesTemp);
    }
    return (
        <Box className="max-w-full w-full h-full max-h-full p-4">
            <SimpleGrid minChildWidth="14rem" gap="2rem" className="max-w-full w-full " >
                {resources.map((resource: Resource) => {
                    return (
                        <div key={`resource-preview-${resource.id}`} className="resource-preview">
                            <ResourceCard resource={resource} onSelectHandler={selectionHandler} />
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