"use client";
import { ContentCreationContext } from "@/context/create/provider";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import ResourceList from "../library/resourceList";
import { Resource } from "@/types/resourceTypes";
import { useSelectResources } from "@/hooks/useSelectResources";
import { ResourceCardSelectDeleteActions } from "../library/resource_card/resourceCardSelectDeleteActions";
import { ResourceCardDeSelectAction } from "../library/resource_card/resourceCardDeSelectAction";
import LibraryResourceUploader from "../image_processor/LibraryResourceUploader";
import ResourceUploaderContainer from "./ResourceUploaderContainer";


export const ContentInputPanel = () => {

    const { inputContent, setAllInputContent } = useContext(ContentCreationContext);
    const [resources, setResources] = useState<Map<string, Resource>>(new Map());
    const [showExistingTray, setShowExistingTray] = useState(false);
    const [showNewTray, setShowNewTray] = useState(false);
    const { selectedResources, selectionHandler, setAllResources } = useSelectResources();

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

    useEffect(() => {
        setAllResources(inputContent);
    }, [inputContent]);



    const updateInputContentList = () => {
        setAllInputContent(selectedResources);
        setShowExistingTray(false);
        setShowNewTray(false);
    }

    const cancelSelectionUpdate = () => {
        setAllResources(inputContent);
        setShowExistingTray(false);
        setShowNewTray(false);
    }

    return (
        <>
            <Flex
                direction="column"
                maxHeight="100%"
                height="100%"
                minHeight="0"
                maxWidth="100%"
                width="100%"
                p="4"
            >

                <Stack className="flex-grow-0 mb-4">
                    <Heading>Input Content</Heading>
                    <Box>
                        <DrawerRoot lazyMount size="lg" open={showExistingTray} unmountOnExit onOpenChange={(e) => setShowExistingTray(e.open)} key="existing-drawer" closeOnInteractOutside={false}>
                            <DrawerBackdrop />
                            <DrawerTrigger asChild>
                                <Button variant="outline">Add Existing</Button>
                            </DrawerTrigger>

                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Existing Resources</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>

                                    {/*TODO: Need a ResourceList that has a container
                                    that passes down a selection handler*/}

                                    <ResourceList resources={resources} selectable selectedResources={selectedResources} selectionCallback={selectionHandler} />

                                </DrawerBody>
                                <DrawerFooter>
                                    <Button variant="ghost" onClick={cancelSelectionUpdate}>Cancel</Button>
                                    <Button variant="surface" onClick={updateInputContentList}>Select</Button>
                                </DrawerFooter>

                                <DrawerCloseTrigger />
                            </DrawerContent>

                        </DrawerRoot>
                    </Box>

                    <Box>
                        <ResourceUploaderContainer cancelAction={cancelSelectionUpdate} setShowTray={setShowNewTray} showTray={showNewTray} />
                    </Box>
                </Stack>

                <Box className="flex-grow border-2 h-full max-h-full overflow-y-auto" p="4">
                    <ResourceList compact resources={inputContent} cardActions={ResourceCardDeSelectAction} />
                </Box>
            </Flex>

        </>
    )
}

export default ContentInputPanel;