"use client";

import { ResourcesContext } from "@/context/resources/provider";
import { MACHINE_GENERATED_TYPES } from "@/types/constants";
import { generateResource } from "@/utils/resources/client";
import { Box, Button, Radio, RadioGroup } from "@chakra-ui/react";
import { useContext, useState } from "react";

export const ResourceActionsPanel = () => {
    const { selectedResources, isGenerating, setIsGenerating, setActiveResource } = useContext(ResourcesContext);
    const [selectedResourceType, setSelectedResourceType] = useState<string>("");


    const generateResourceHandler = async () => {
        setIsGenerating(true);
        const generatedResource = await generateResource(selectedResourceType, Object.keys(selectedResources.current));
        setActiveResource(generatedResource);
        setIsGenerating(false);
    }

    const deleteResourcesHandler = async () => {
        console.log("DELETE");
    }
    return (
        <Box>

            <div>
                <RadioGroup onChange={setSelectedResourceType} value={selectedResourceType}>
                    {MACHINE_GENERATED_TYPES.map((resource_type) => {
                        return <Radio key={`resource-generation-type-checkbox-${resource_type}`} value={resource_type}>{resource_type.replace("_", " ").toLowerCase()}</Radio>
                    })}
                </RadioGroup>
            </div>

            <div>
                <Button disabled={isGenerating} backgroundColor="red" color="white" onClick={deleteResourcesHandler}>Delete Resource(s)</Button>

            </div>
            <div>
                <Button disabled={isGenerating} onClick={generateResourceHandler}>Generate Resource</Button>

            </div>
        </Box>
    )
}

export default ResourceActionsPanel;