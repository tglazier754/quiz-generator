"use client";

import { ResourcesContext } from "@/context/library/provider";
import { MACHINE_GENERATED_TYPES } from "@/types/constants";
import { archiveMultipleResources, generateResource, ResourceType } from "@/utils/resources/client";
import { Box, Button, createListCollection, Flex, } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { toaster } from "../ui/toaster";
import { BiPlus } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "../ui/drawer";

export const ResourceActionsPanel = () => {
    const { selectedResources, isGenerating, setIsGenerating } = useContext(ResourcesContext);
    const [selectedResourceType, setSelectedResourceType] = useState<string[]>([]);

    const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

    const MACHINE_GENERATED_TYPES_LIST_DATA = createListCollection({ items: MACHINE_GENERATED_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });

    const router = useRouter();



    const generateResourceHandler = async () => {

        const selectedResourceIdList = Object.keys(selectedResources);
        if (selectedResourceIdList.length) {
            setIsGenerating(true);
            setIsGenerateDialogOpen(false);
            try {
                const generatedResource = await generateResource({ content_type: selectedResourceType[0].toUpperCase() as ResourceType, expected_duration: 30, grade_level: "7-8" }, selectedResourceIdList);
                //redirect to /resource?id={generated_id}
                router.push(`/resource?id=${generatedResource.id}`);
                setIsGenerating(false);
                setSelectedResourceType([]);
            }
            catch (error) {
                console.log(error);
                setIsGenerating(false);
                setSelectedResourceType([]);
                toaster.create({ type: "Error", description: "Unable to generate the resource" });
            }
        }
        else {

            setIsGenerating(false);
            setSelectedResourceType([]);
            toaster.create({
                description: "There are no selected resources to generate from",
                type: "error"
            })
        }
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


                    <DrawerRoot lazyMount size="full" open={isGenerateDialogOpen} unmountOnExit onOpenChange={(e) => setIsGenerateDialogOpen(e.open)} key="full-drawer" closeOnInteractOutside={false}>
                        <DrawerBackdrop />
                        <DrawerTrigger asChild>
                            <Button disabled={isGenerating || !Object.keys(selectedResources).length} variant="outline">
                                <FaWandMagicSparkles />
                            </Button>
                        </DrawerTrigger>

                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Generate Content</DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>

                                <SelectRoot collection={MACHINE_GENERATED_TYPES_LIST_DATA} onValueChange={(e) => setSelectedResourceType(e.value)} value={selectedResourceType}>
                                    <SelectLabel>Resource type</SelectLabel>
                                    <SelectTrigger>
                                        <SelectValueText placeholder="Select Content Type" />
                                    </SelectTrigger>
                                    <SelectContent zIndex={100000} >
                                        {MACHINE_GENERATED_TYPES_LIST_DATA.items.map((resource_type) => (
                                            <SelectItem key={`resource-generation-type-select-${resource_type.value}`} item={resource_type.value} >
                                                {resource_type.label}
                                            </SelectItem>
                                        )
                                        )}
                                    </SelectContent>
                                </SelectRoot>

                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant="ghost" disabled={isGenerating} onClick={() => setIsGenerateDialogOpen(false)}>Cancel</Button>
                                <Button variant="surface" disabled={isGenerating || !selectedResourceType.length} onClick={generateResourceHandler}>Generate</Button>
                            </DrawerFooter>

                            <DrawerCloseTrigger />
                        </DrawerContent>

                    </DrawerRoot>
                </Box>
                <Box>

                </Box>

                <Link href={"/resource"}>
                    <Button disabled={isGenerating} variant="outline">
                        <BiPlus />
                    </Button>
                </Link>

            </Flex >
        </Box >
    )
}

export default ResourceActionsPanel;