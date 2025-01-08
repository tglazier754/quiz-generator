"use client";
import { ContentCreationContext } from "@/context/create/provider";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import ResourceList from "../library/resourceList";
import { useSelectResources } from "@/hooks/useSelectResources";
import { ResourceCardDeSelectAction } from "../library/resource_card/resourceCardDeSelectAction";
import ResourceUploaderContainer from "./ResourceUploaderContainer";
import ResourceSelectorContainer from "./ResourceSelectorContainer";


export const ContentInputPanel = () => {

    const { inputContent } = useContext(ContentCreationContext);
    const [showExistingTray, setShowExistingTray] = useState(false);
    const [showNewTray, setShowNewTray] = useState(false);
    const { setAllResources } = useSelectResources();

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
                    <Box>
                        <ResourceSelectorContainer cancelAction={cancelSelectionUpdate} setShowTray={setShowExistingTray} showTray={showExistingTray} />
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