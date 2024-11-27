"use client";
import { Box, Button, createListCollection, Group, Stack, Text } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { GRADE_LEVELS, MACHINE_GENERATED_TYPES } from "@/types/constants";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { Field } from "../ui/field";


export const ParameterForm = () => {

    const GRADE_LEVEL_LIST_DATA = createListCollection({ items: GRADE_LEVELS.map((type) => { return { label: type.toLowerCase(), value: type } }) });

    const MACHINE_GENERATED_TYPES_LIST_DATA = createListCollection({ items: MACHINE_GENERATED_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });

    return (
        <Stack justify="space-between" gap="8">
            <Box>
                <SelectRoot collection={MACHINE_GENERATED_TYPES_LIST_DATA}>

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
            </Box>
            <Box>
                <SelectRoot collection={GRADE_LEVEL_LIST_DATA}>
                    <SelectLabel>Grade Level</SelectLabel>
                    <SelectTrigger>
                        <SelectValueText placeholder="Select Content Type" />
                    </SelectTrigger>
                    <SelectContent zIndex={100000} >
                        {GRADE_LEVEL_LIST_DATA.items.map((grade_level) => (
                            <SelectItem key={`resource-generation-type-select-${grade_level.value}`} item={grade_level.value} >
                                {grade_level.label}
                            </SelectItem>
                        )
                        )}
                    </SelectContent>
                </SelectRoot>
            </Box>
            <Field label="Expected Duration (in minutes)">
                <NumberInputRoot>
                    <NumberInputField />
                </NumberInputRoot>
            </Field>
            <Field label="Question Mix">

                <Group>
                    <Field label="True/False">
                        <NumberInputRoot>
                            <NumberInputField />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Multiple Choice">
                        <NumberInputRoot>
                            <NumberInputField />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Short Answer">
                        <NumberInputRoot>
                            <NumberInputField />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Long Form">
                        <NumberInputRoot>
                            <NumberInputField />
                        </NumberInputRoot>
                    </Field>
                </Group>
            </Field>
            <Box>
                <Button>Create</Button>
            </Box>

        </Stack >
    )

}

export default ParameterForm;