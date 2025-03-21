"use client";
import { Resource } from "@/types/resourceTypes";
import ResourceCard from "../resources/resource_card/ResourceCard";

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

    const selectionHandler = (resource: Resource, state: boolean) => {
        if (resource.id && selectable && selectionCallback) {
            selectionCallback(resourceMap.get(resource.id), state);
        }
    }


    return (
        <div className="max-w-full w-full h-full max-h-full">
            {!resourceMap.size ?
                <div className="flex flex-col mb-4 justify-center items-center">
                    <span>No resources to display.</span>
                </div> : ""}

            <div className="max-w-full w-full gap-4">

                {resourceMap && resourceMap.size > 0 && Array.from(resourceMap?.entries().map((value: [string, Resource]) => {
                    if (value[1].id) {
                        return (
                            <div key={`resource-preview-${value[1].id}`} className="resource-preview">
                                <ResourceCard
                                    resource={value[1]}
                                    isSelected={selectable && value[1].id && selectedResources && selectedResources.get(value[1].id) ? true : false}
                                    clickAction={selectionHandler}>
                                    {props.cardActions && <props.cardActions resourceId={value[1].id} />}
                                </ResourceCard>

                            </div>)
                    }
                }
                ))}
            </div>
        </div>
    )
}

export default ResourceList;