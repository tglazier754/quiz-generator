"use client";
import { Resource } from "@/types/resourceTypes";

import "./resources.scss";
import ResourceLineItem from "./resourceLineItem";
import { IHash } from "@/types/globalTypes";
import { Button, Flex } from "@chakra-ui/react";
import { useRef } from "react";
import Link from "next/link";

type ResourceListProps = {
    resources: Resource[];
}
export const ResourceList = (props: ResourceListProps) => {
    const { resources } = props;
    const selectedResources: IHash = useRef({});

    //on edit, send the list of selected id's
    const selectionHandler = (selectedId: string, state: boolean) => {
        if (state) {
            selectedResources.current[selectedId] = state;
        }
        else {
            delete selectedResources.current[selectedId];
        }
    }


    return (
        <div className="user-resources-container h-full">

            <Flex flexDirection="column" className="max-h-full flex-nowrap h-full">

                <div className="h-[90%] ">
                    <div className="resources-list mr-2">
                        {resources.map((resource: Resource) => {
                            return (
                                <div key={`resource-preview-${resource.id}`} className="resource-preview">
                                    <ResourceLineItem resource={resource} onSelectHandler={selectionHandler} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="button-container h-[9%]">
                    <div className="add-resource-button">
                        <Link href="/image_processor"><Button>Add</Button></Link>
                    </div>
                </div>
            </Flex>
        </div>
    )

}

export default ResourceList;