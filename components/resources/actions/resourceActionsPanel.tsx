"use client";

import { ResourcesContext } from "@/context/resources/provider";
import { MACHINE_GENERATED_TYPES } from "@/types/constants";
import { generateResource } from "@/utils/resources/client";
//import { generateResource } from "@/utils/resources/client";
import { Box, Button, Checkbox, CheckboxGroup, useCheckboxGroup } from "@chakra-ui/react";
import { useContext, useState } from "react";
//import { generateResource } from "@/utils/resources/client";

export const ResourceActionsPanel = () => {
    const { selectedResources } = useContext(ResourcesContext);
    const [selectedResourceTypes, setSelectedResourceTypes] = useState<(string | number)[]>([]);

    const { value, getCheckboxProps } = useCheckboxGroup({
        onChange: (selectedValues: (string | number)[]) => {
            const checkBoxState = selectedValues;
            console.log(checkBoxState);
            setSelectedResourceTypes(checkBoxState);
        },
    });


    const generateResourceHandler = async () => {

        //TODO: Hook up to the app context
        console.log(selectedResourceTypes);
        const quizData = await generateResource(Object.keys(selectedResources.current));
        console.log(quizData);
        console.log("GENERATE");
    }

    const deleteResourcesHandler = async () => {
        console.log("DELETE");
    }
    return (
        <Box>

            <div>
                <CheckboxGroup value={value}>
                    {MACHINE_GENERATED_TYPES.map((resource_type) => {
                        return <Checkbox {...getCheckboxProps({ value: resource_type })} key={`resource-generation-type-checkbox-${resource_type}`} value={resource_type}>{resource_type.replace("_", " ").toLowerCase()}</Checkbox>
                    })}
                </CheckboxGroup>
            </div>

            <div>
                <Button backgroundColor="red" color="white" onClick={deleteResourcesHandler}>Delete Resource(s)</Button>

            </div>
            <div>
                <Button onClick={generateResourceHandler}>Generate Resource</Button>

            </div>
        </Box>
    )
}

export default ResourceActionsPanel;