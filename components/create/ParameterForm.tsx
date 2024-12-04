"use client";
import { Box, createListCollection, Group, Stack, Text } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { GRADE_LEVELS, MACHINE_GENERATED_TYPES } from "@/types/constants";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { Field } from "../ui/field";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { ContentCreationContext } from "@/context/create/provider";
import { useRouter } from "next/navigation";
import useResourceCreation from "@/hooks/useResourceCreation";
import { Button } from "../ui/button";
import { ResourceGenerationParams } from "@/utils/resources/client";


export const ParameterForm = () => {
    const GRADE_LEVEL_LIST_DATA = createListCollection({ items: GRADE_LEVELS.map((type) => { return { label: type.toLowerCase(), value: type } }) });
    const MACHINE_GENERATED_TYPES_LIST_DATA = createListCollection({ items: MACHINE_GENERATED_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });

    const router = useRouter();
    const { inputContent } = useContext(ContentCreationContext);
    const { createResource, uploadStatus } = useResourceCreation();
    const { control, register, unregister, handleSubmit, watch } = useForm<ResourceGenerationParams>({ shouldUnregister: true, });
    const handleCreateResource: SubmitHandler<ResourceGenerationParams> = async (data: ResourceGenerationParams) => {
        console.log(data);
        const generatedResource = await createResource(data.content_type[0], Array.from(inputContent.keys()));
        console.log(generatedResource);
        router.push(`/resource?id=${generatedResource.id}`);
    }
    const handleSubmitError = (data: any) => { console.log(data) };
    const watchResourceTypeSelection = watch("content_type");

    const [showQuizSection, setShowQuizSection] = useState(true);

    useEffect(() => {
        console.log(watchResourceTypeSelection);
        if (watchResourceTypeSelection && watchResourceTypeSelection[0] === "QUIZ") {
            setShowQuizSection(true);
            register("true_false_count");
            register("multiple_choice_count");
            register("short_answer_count");
            register("long_form_count");
        }
        else {
            setShowQuizSection(false);
            unregister("true_false_count");
            unregister("multiple_choice_count");
            unregister("short_answer_count");
            unregister("long_form_count");
        }
    }, [watchResourceTypeSelection])

    return (<form onSubmit={handleSubmit(handleCreateResource, handleSubmitError)}>
        <Stack justify="space-between" gap="8">

            <Box>
                <Controller
                    name="content_type"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Select a Content Type",
                        }
                    }}
                    render={({ field: { ref, ...restField } }) => (
                        <SelectRoot collection={MACHINE_GENERATED_TYPES_LIST_DATA}
                            onValueChange={(value) => {
                                restField.onChange(value.value);
                            }} >

                            <SelectLabel>Resource type</SelectLabel>
                            <SelectTrigger  >
                                <SelectValueText placeholder="Select Content Type" />
                            </SelectTrigger>
                            <SelectContent zIndex={100000} ref={ref} {...restField}>
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
                    name="grade_level"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Select a Grade Level",
                        }
                    }}
                    render={({ field: { ref, ...restField } }) => (
                        <SelectRoot collection={GRADE_LEVEL_LIST_DATA}
                            onValueChange={(value) => {
                                restField.onChange(value.value);
                            }} >
                            <SelectLabel>Grade Level</SelectLabel>
                            <SelectTrigger>
                                <SelectValueText placeholder="Select Grade Level" />
                            </SelectTrigger>
                            <SelectContent zIndex={100000} ref={ref} {...restField}>
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

                <NumberInputRoot min={0} >
                    <NumberInputField {...register("expected_duration")} />
                </NumberInputRoot>

            </Field>
            {showQuizSection && <Field label="Question Mix">

                <Group>
                    <Field label="True/False">
                        <NumberInputRoot >
                            <NumberInputField {...register("true_false_count")} />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Multiple Choice">
                        <NumberInputRoot >
                            <NumberInputField {...register("multiple_choice_count")} />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Short Answer">
                        <NumberInputRoot >
                            <NumberInputField {...register("short_answer_count")} />
                        </NumberInputRoot>
                    </Field>
                    <Field label="Long Form">
                        <NumberInputRoot >
                            <NumberInputField {...register("long_form_count")} />
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