"use client";

import { useContext, useEffect, useState } from "react";
import ResourceList from "../library/resourceList";
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { ContentCreationContext } from "@/context/create/provider";
import { Resource } from "@/types/resourceTypes";
import { useSelectResources } from "@/hooks/useSelectResources";
import { Button } from "@chakra-ui/react";

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
                console.log(jsonValue);
                const jsonValueMap: Map<string, Resource> = new Map(Object.entries(jsonValue));
                console.log(jsonValueMap);
                setResources(jsonValueMap);
            })
        });
    }, []);


    const updateInputContentList = () => {
        setAllInputContent(selectedResources);
        setShowTray(false);
    }

    return (
        <DrawerRoot lazyMount size="lg" open={showTray} unmountOnExit onOpenChange={(e) => setShowTray(e.open)} key="existing-drawer" closeOnInteractOutside={false}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button variant="outline">Add Existing</Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Existing Resources</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>

                    <ResourceList resources={resources} selectable selectedResources={selectedResources} selectionCallback={selectionHandler} />

                </DrawerBody>
                <DrawerFooter>
                    <Button variant="ghost" onClick={cancelAction}>Cancel</Button>
                    <Button variant="surface" onClick={updateInputContentList}>Select</Button>
                </DrawerFooter>

                <DrawerCloseTrigger />
            </DrawerContent>

        </DrawerRoot>
    )
}

export default ResourceSelectorContainer;