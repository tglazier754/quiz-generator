"use client"
import { Resource } from "@/types/resourceTypes"
import ResourceCard from "./ResourceCard";
import { ResourcesContext } from "@/context/library/provider";
import { useContext } from "react";
import { ResourceCardSelectDeleteActions } from "./resourceCardSelectDeleteActions";

type ResourceListContainerProps = {
    listData: Map<string, Resource>;
}

export const ResourceListContainer = (props: ResourceListContainerProps) => {
    const { listData } = props;
    const { selectedResources, selectResource } = useContext(ResourcesContext);

    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listData && listData.size > 0 && Array.from(listData.entries()).map((value: [string, Resource]) => {
            return (
                <div key={value[0] + "-resource-list-item"}>
                    <ResourceCard
                        resource={value[1]}
                        isSelected={value[1].id && selectedResources && selectedResources.get(value[1].id) ? true : false}
                        clickAction={selectResource}>
                        <ResourceCardSelectDeleteActions resourceId={value[0]} />
                    </ResourceCard>
                </div>);
        })
        }
    </div>)

}

export default ResourceListContainer;