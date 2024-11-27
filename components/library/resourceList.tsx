"use client";
import { Resource } from "@/types/resourceTypes";
import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import ResourceCard from "./resource_card/resourceCard";
import { JSXElementConstructor, ReactElement } from "react";

type ResourceListProps = {
    resources: Map<string, Resource>;
    selectedResources?: Map<string, Resource>;
    selectionCallback?: (selectedResource: Resource | undefined, state: boolean) => void;
    selectable?: boolean;
    compact?: boolean;
    cardActions?: React.ComponentType<{
        resourceId: string;
    }>;
}
export const ResourceList = (props: ResourceListProps) => {
    const { resources: resourceMap, selectedResources, selectionCallback, selectable, compact } = props;

    const selectionHandler = (id: string, state: boolean) => {
        if (selectable) {
            selectionCallback && selectionCallback(resourceMap.get(id), state);
        }
    }


    return (
        <Box className="max-w-full w-full h-full max-h-full">
            {!resourceMap.size ?
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center">
                    <Heading size="2xl">No resources to display.</Heading>
                </Stack> : ""}

            <SimpleGrid minChildWidth="12rem" gap="1rem" className="max-w-full w-full">
                {Array.from(resourceMap?.entries().map((value: [string, Resource]) => {
                    if (value[1].id) {
                        return (
                            <div key={`resource-preview-${value[1].id}`} className="resource-preview">
                                <ResourceCard
                                    actionButtons={props.cardActions && <props.cardActions resourceId={value[1].id} />}
                                    compact={compact || false}
                                    resource={value[1]}
                                    selected={selectable && value[1].id && selectedResources && selectedResources.get(value[1].id) ? true : false}
                                    onSelectHandler={selectionHandler} />

                            </div>)
                    }
                }
                ))}
            </SimpleGrid>
        </Box>
    )
}

export default ResourceList;