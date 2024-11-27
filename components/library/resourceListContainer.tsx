
"use client";

import { Resource } from "@/types/resourceTypes";
import ResourceList from "./resourceList";
import { ResourceCardSelectDeleteActions } from "./resource_card/resourceCardSelectDeleteActions";

type ResourceListContainerProps = {
    resourceMap: Map<string, Resource>
}

export const ResourceListContainer = (props: ResourceListContainerProps) => {
    const { resourceMap } = props;
    return <ResourceList cardActions={ResourceCardSelectDeleteActions} resources={resourceMap} />
}

export default ResourceListContainer;