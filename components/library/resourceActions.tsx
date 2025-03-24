"use client";

import { ResourcesContext } from "@/context/library/provider";
import { MACHINE_GENERATED_TYPES } from "@/types/constants";
import { archiveMultipleResources, generateResource, ResourceType } from "@/utils/resources/client";
import { useContext, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { Trash, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export const ResourceActionsPanel = () => {
    const { selectedResources, clearSelectedResources, isGenerating, setIsGenerating } = useContext(ResourcesContext);
    const [selectedResourceType, setSelectedResourceType] = useState<string[]>([]);

    const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

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
                toast("Error", { description: "Unable to generate the resource" });
            }
        }
        else {

            setIsGenerating(false);
            setSelectedResourceType([]);
            toast("Error", { description: "There are no selected resources to generate from" });
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
        <div>
            {selectedResources.size > 0 && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white border rounded-lg shadow-xl px-4 py-3 flex items-center gap-4 w-[90%] max-w-xl">
                    <div className="flex items-center gap-2">
                        <Badge variant="default" className="h-7 px-2">
                            {selectedResources.size} selected
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={clearSelectedResources} className="h-7 px-2">
                            <X className="h-4 w-4 mr-1" />
                            Clear
                        </Button>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Drawer open={isGenerateDialogOpen} key="full-drawer" >
                            <DrawerTrigger asChild>
                                <Button disabled={isGenerating || !selectedResources.size} variant="outline">
                                    <FaWandMagicSparkles />
                                </Button>
                            </DrawerTrigger>

                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Generate Content</DrawerTitle>
                                </DrawerHeader>

                                <Select onValueChange={(e) => console.log(e)} >
                                    <SelectLabel>Resource type</SelectLabel>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Content Type" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {MACHINE_GENERATED_TYPES.map((resource_type) => (
                                            <SelectItem key={`resource-generation-type-select-${resource_type}`} value={resource_type} >
                                                {resource_type}
                                            </SelectItem>
                                        )
                                        )}
                                    </SelectContent>
                                </Select>
                            </DrawerContent>
                            <DrawerFooter>
                                <Button variant="ghost" disabled={isGenerating} onClick={() => setIsGenerateDialogOpen(false)}>Cancel</Button>
                                <Button variant="secondary" disabled={isGenerating || !selectedResourceType.length} onClick={generateResourceHandler}>Generate</Button>
                            </DrawerFooter>

                        </Drawer>
                        <Button variant="default" size="sm" className="h-8"
                            onClick={deleteResourcesHandler}>
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </div >
    )
}

export default ResourceActionsPanel;