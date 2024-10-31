"use client";
import { Resource } from "@/types/resourceTypes";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ResourceCard from "./resourceCard";
import { ResourcesContext } from "@/context/resources/provider";
import { useContext } from "react";

type ResourceListProps = {
    resources: Resource[];
}
export const ResourceList = (props: ResourceListProps) => {
    const { resources } = props;
    const { selectedResources } = useContext(ResourcesContext);

    //on edit, send the list of selected id's
    const selectionHandler = (selectedId: string, state: boolean) => {
        if (state) {
            selectedResources.current[selectedId] = state;
        }
        else {
            delete selectedResources.current[selectedId];
        }

        console.log(selectedResources.current);
    }
    return (
        <div className="max-w-full w-full h-full max-h-full">
            <SimpleGrid minChildWidth="10rem" className="max-w-full w-full " >
                {resources.map((resource: Resource) => {
                    return (
                        <div key={`resource-preview-${resource.id}`} className="resource-preview">
                            <ResourceCard resource={resource} onSelectHandler={selectionHandler} />
                        </div>
                    )
                })}
            </SimpleGrid>
        </div>
    )
}

export default ResourceList;