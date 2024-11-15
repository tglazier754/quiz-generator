"use client";

import { ResourcesContext } from "@/context/resources/provider";
import { MACHINE_GENERATED_TYPES } from "@/types/constants";
import { archiveMultipleResources, generateResource } from "@/utils/resources/client";
import { Box, Button, createListCollection, DialogHeader, Flex, } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { DialogBody, DialogContent, DialogFooter, DialogRoot, DialogTitle, DialogTrigger } from "../ui/dialog";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { toaster } from "../ui/toaster";
import LibraryResourceUploader from "../image_processor/LibraryResourceUploader";

export const ResourceActionsPanel = () => {
    const { selectedResources, isGenerating, setIsGenerating, setActiveResource } = useContext(ResourcesContext);
    const [selectedResourceType, setSelectedResourceType] = useState<string[]>([]);

    const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

    const MACHINE_GENERATED_TYPES_LIST_DATA = createListCollection({ items: MACHINE_GENERATED_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });



    const generateResourceHandler = async () => {

        const selectedResourceIdList = Object.keys(selectedResources);
        if (selectedResourceIdList.length) {
            setIsGenerating(true);
            setIsGenerateDialogOpen(false);
            console.log(selectedResourceType[0]);
            try {
                console.log(selectedResourceIdList);
                const generatedResource = await generateResource(selectedResourceType[0], selectedResourceIdList);
                setActiveResource(generatedResource);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            toaster.create({
                description: "There are no selected resources to generate from",
                type: "error"
            })
        }
        setIsGenerating(false);
        setSelectedResourceType([]);
    }

    const deleteResourcesHandler = async () => {
        const selectedResourceIdList = Object.keys(selectedResources);
        //TODO: Put a dialog in front of this
        if (selectedResourceIdList.length) {
            await archiveMultipleResources(selectedResourceIdList);
            //TODO: remove the archived from the list
        }
    }
    return (
        <Box>
            <Flex direction="row" gap="1rem" align="center" justify="flex-end">
                <Box>
                    <Button disabled={isGenerating || !Object.keys(selectedResources).length} colorPalette="red" variant="ghost" onClick={deleteResourcesHandler}>
                        <TbTrash />
                    </Button>
                </Box>
                <Box>


                    <DialogRoot lazyMount open={isGenerateDialogOpen} onOpenChange={(e) => setIsGenerateDialogOpen(e.open)}>
                        <DialogTrigger asChild>
                            <Button disabled={isGenerating || !Object.keys(selectedResources).length} variant="outline">
                                <FaWandMagicSparkles />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Generate Content</DialogTitle>
                            </DialogHeader>
                            <DialogBody>

                                <SelectRoot collection={MACHINE_GENERATED_TYPES_LIST_DATA} onValueChange={(e) => setSelectedResourceType(e.value)} value={selectedResourceType}>
                                    <SelectLabel>Select resource type</SelectLabel>
                                    <SelectTrigger>
                                        <SelectValueText placeholder="Select Content Type" />
                                    </SelectTrigger>
                                    <SelectContent zIndex={100000}>
                                        {MACHINE_GENERATED_TYPES_LIST_DATA.items.map((resource_type) => (
                                            <SelectItem key={`resource-generation-type-select-${resource_type.value}`} item={resource_type.value}>
                                                {resource_type.label}
                                            </SelectItem>
                                        )
                                        )}
                                    </SelectContent>
                                </SelectRoot>

                            </DialogBody>
                            <DialogFooter>
                                <Button variant="ghost" disabled={isGenerating} onClick={() => setIsGenerateDialogOpen(false)}>Cancel</Button>
                                <Button variant="surface" disabled={isGenerating || !selectedResourceType.length} onClick={generateResourceHandler}>Generate</Button>
                            </DialogFooter>
                        </DialogContent>

                    </DialogRoot>
                </Box>
                <Box>

                </Box>

                <LibraryResourceUploader />

            </Flex >
        </Box >
    )
}

export default ResourceActionsPanel;