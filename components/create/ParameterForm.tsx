"use client";
import { Box, createListCollection, Group, Stack, Text } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { GRADE_LEVELS, MACHINE_GENERATED_TYPES } from "@/types/constants";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { Field } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { ContentCreationContext } from "@/context/create/provider";
import { useRouter } from "next/navigation";
import useResourceCreation from "@/hooks/useResourceCreation";
import { Button } from "../ui/button";


export const ParameterForm = () => {
    const GRADE_LEVEL_LIST_DATA = createListCollection({ items: GRADE_LEVELS.map((type) => { return { label: type.toLowerCase(), value: type } }) });
    const MACHINE_GENERATED_TYPES_LIST_DATA = createListCollection({ items: MACHINE_GENERATED_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });

    const router = useRouter();
    const { inputContent } = useContext(ContentCreationContext);
    const { createResource, uploadStatus } = useResourceCreation();
    const { control, register, unregister, handleSubmit, watch } = useForm({ shouldUnregister: true, });
    const handleCreateResource = async (data: any) => {
        console.log(data);
        const generatedResource = await createResource(data.contentType[0], Array.from(inputContent.keys()));
        console.log(generatedResource);
        router.push(`/resource?id=${generatedResource.id}`);
    }
    const handleSubmitError = (data: any) => { console.log(data) };
    const watchResourceTypeSelection = watch("contentType");

    const [showQuizSection, setShowQuizSection] = useState(true);

    useEffect(() => {
        console.log(watchResourceTypeSelection);
        if (watchResourceTypeSelection && watchResourceTypeSelection[0] === "QUIZ") {
            setShowQuizSection(true);
            register("trueFalseCount");
            register("multipleChoiceCount");
            register("shortAnswerCount");
            register("LongFormCount");
        }
        else {
            console.log("unregister");
            setShowQuizSection(false);
            unregister("trueFalseCount");
            unregister("multipleChoiceCount");
            unregister("shortAnswerCount");
            unregister("LongFormCount");
        }
    }, [watchResourceTypeSelection])

    return (<form onSubmit={handleSubmit(handleCreateResource, handleSubmitError)}>
        <Stack justify="space-between" gap="8">

            <Box>
                <Controller
                    name="contentType"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Select a Content Type",
                        }
                    }}
                    render={({ field: { ref, ...restField } }) => (
                        <SelectRoot collection={MACHINE_GENERATED_TYPES_LIST_DATA} {...restField}
                            onValueChange={(value) => {
                                restField.onChange(value.value);
                            }} >

                            <SelectLabel>Resource type</SelectLabel>
                            <SelectTrigger>
                                <SelectValueText placeholder="Select Content Type" />
                            </SelectTrigger>
                            <SelectContent zIndex={100000} ref={ref}>
                                {MACHINE_GENERATED_TYPES_LIST_DATA.items.map((resource_type) => (
                                    <SelectItem key={`resource-generation-type-select-${resource_type.value}`} item={resource_type.value} >
                                        {resource_type.label}
                                    </SelectItem>
                                )
                                )}
                            </SelectContent>
                        </SelectRoot>
                    )}
                />
            </Box>
            <Box>
                <Controller
                    name="gradeLevel"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Select a Grade Level",
                        }
                    }}
                    render={({ field: { ref, ...restField } }) => (
                        <SelectRoot collection={GRADE_LEVEL_LIST_DATA}{...restField}
                            onValueChange={(value) => {
                                restField.onChange(value.value);
                            }} >
                            <SelectLabel>Grade Level</SelectLabel>
                            <SelectTrigger>
                                <SelectValueText placeholder="Select Grade Level" />
                            </SelectTrigger>
                            <SelectContent zIndex={100000} >
                                {GRADE_LEVEL_LIST_DATA.items.map((grade_level) => (
                                    <SelectItem key={`resource-generation-grade-select-${grade_level.value}`} item={grade_level.value} >
                                        {grade_level.label}
                                    </SelectItem>
                                )
                                )}
                            </SelectContent>
                        </SelectRoot>
                    )} />
            </Box>
            <Field label="Expected Duration (in minutes)">
                <Controller
                    name="expected-duration"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Expected Duration is Required",
                        }
                    }}
                    render={({ field: { ref, ...restField } }) => (
                        <NumberInputRoot {...restField} min={0} >
                            <NumberInputField ref={ref} name={restField.name} />
                        </NumberInputRoot>
                    )}
                />

            </Field>
            {showQuizSection && <Field label="Question Mix">

                <Group>
                    <Field label="True/False">
                        <NumberInputRoot >
                            <NumberInputField {...register("trueFalseCount")} />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Multiple Choice">
                        <NumberInputRoot >
                            <NumberInputField {...register("multipleChoiceCount")} />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Short Answer">
                        <NumberInputRoot >
                            <NumberInputField {...register("shortAnswerCount")} />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Long Form">
                        <NumberInputRoot >
                            <NumberInputField {...register("LongFormCount")} />
                        </NumberInputRoot>
                    </Field>
                </Group>
            </Field>}
            <Box>
                <Button
                    disabled={uploadStatus.status === "pending"}
                    loading={uploadStatus.status === "pending"}
                    type="submit">
                    Create
                </Button>
            </Box>

        </Stack >
    </form>
    )

}

export default ParameterForm;