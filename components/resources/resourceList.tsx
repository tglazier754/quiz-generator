"use client";
import { Resource } from "@/types/resourceTypes";

import "./resources.scss";
import ResourceLineItem from "./resourceLineItem";
import { IHash } from "@/types/globalTypes";
import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { URL_PARAM_RESOURCE_ID } from "@/types/constants";
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


    const generateHandler = async () => {
        const resourceIdParamArray = Object.keys(selectedResources.current).map((key) => [URL_PARAM_RESOURCE_ID, key]);

        const resourceIdSearchParams = new URLSearchParams(resourceIdParamArray);
        const quizFetch = await fetch("/api/quiz?" + resourceIdSearchParams.toString(), { method: "POST" });
        const quizData = await quizFetch.json();
        console.log(quizData);
        //TODO: put the returned quizData into a useContext container to be displayed
    }

    return (
        <div className="user-resources-container">

            <div className="button-container">

                <div className="add-resource-button">
                    <Link href="/image_processor"><Button>Add</Button></Link>
                </div>
                <div className="generate-button">
                    <Button onClick={generateHandler}>Generate</Button>
                </div>
            </div>

            <div className="resources-list">
                {resources.map((resource: Resource) => {
                    return (
                        <div key={`resource-preview-${resource.id}`} className="resource-preview">
                            <ResourceLineItem resource={resource} onSelectHandler={selectionHandler} />
                        </div>
                    )
                })}

            </div>
        </div>
    )

}

export default ResourceList;