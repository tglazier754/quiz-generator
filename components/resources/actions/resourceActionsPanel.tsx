"use client";

import { MACHINE_GENERATED_TYPES } from "@/types/constants";
//import { generateResource } from "@/utils/resources/client";
import { Box, Button, Checkbox, CheckboxGroup } from "@chakra-ui/react";
//import { generateResource } from "@/utils/resources/client";

export const ResourceActionsPanel = () => {



    const generateResourceHandler = async () => {

        //TODO: Hook up to the app context
        //const quizData = await generateResource(Object.keys(selectedResources.current));
        //console.log(quizData);
        console.log("GENERATE");
    }

    const deleteResourcesHandler = async () => {
        console.log("DELETE");
    }
    return (
        <Box>

            <div>
                <CheckboxGroup>
                    {MACHINE_GENERATED_TYPES.map((resource_type) => {
                        return <Checkbox key={`resource-generation-type-checkbox-${resource_type}`} value={resource_type}>{resource_type.replace("_", " ").toLowerCase()}</Checkbox>
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