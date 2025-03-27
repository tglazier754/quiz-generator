"use client";

import { useContext, useEffect, useState } from "react";
import ResourceList from "../library/resourceList";
import { ContentCreationContext } from "@/context/create/provider";
import { Resource } from "@/types/resourceTypes";
import { useSelectResources } from "@/hooks/useSelectResources";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

type ResourceSelectorContainerProps = {
    showTray: boolean,
    setShowTray: (value: boolean) => void;
    cancelAction: () => void;
}

export const ResourceSelectorContainer = (props: ResourceSelectorContainerProps) => {
    const { showTray, setShowTray, cancelAction } = props;
    const { setAllInputContent } = useContext(ContentCreationContext);
    const [resources, setResources] = useState<Map<string, Resource>>(new Map());
    const { selectedResources, selectionHandler } = useSelectResources();

    useEffect(() => {
        fetch("/api/resources").then((value) => {
            value.json().then((jsonValue) => {
                const jsonValueMap: Map<string, Resource> = new Map(Object.entries(jsonValue));
                setResources(jsonValueMap);
            })
        });
    }, []);


    const updateInputContentList = () => {
        setAllInputContent(selectedResources);
        setShowTray(false);
    }

    return (
        <Drawer key="existing-drawer" direction="right">
            <DrawerTrigger asChild>
                <Button variant="outline">Add Existing</Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Existing Resources</DrawerTitle>
                </DrawerHeader>

                <ResourceList resources={resources} selectable selectedResources={selectedResources} selectionCallback={selectionHandler} />

                <DrawerFooter>
                    <DrawerClose >
                        <Button variant="ghost" onClick={cancelAction}>Cancel</Button>
                    </DrawerClose>
                    <Button variant="default" onClick={updateInputContentList}>Add</Button>
                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    )
}

export default ResourceSelectorContainer;