"use client"

import { RESOURCE_TYPE_IMAGE, RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_TEXT, RESOURCE_TYPE_WEBSITE, USER_RESOURCE_TYPES } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";
import { Box, Button, createListCollection, HStack, Input, Square, Stack, Text, Textarea } from "@chakra-ui/react";
import { useEffect } from "react";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { FileUploadRoot, FileUploadTrigger } from "../ui/file-button";
import { HiUpload } from "react-icons/hi";
import Quiz from "../quiz/quiz";
import ResourceCardImage from "../library/resource_card/resourceCardImage";
import { useImageUpload } from "./hooks/useImageUpload";
import { useActionStatus } from "./hooks/useActionStatus";
import { convertImageToDataUrl } from "@/utils/images/client";
import { useWebsiteUpload } from "./hooks/useWebsiteUpload";
import { Field } from "../ui/field";
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

type LibraryResourceUploaderProps = {
    activeResource?: Resource | null;
    formName: string;
    updateResourceValue: (resource: Resource) => void;
}

export const LibraryResourceUploader = (props: LibraryResourceUploaderProps) => {

    const { activeResource, formName, updateResourceValue } = props;

    const { control, register, handleSubmit, watch, setValue } = useForm<Resource>({ shouldUnregister: true, });
    const defaultName = activeResource && activeResource.name || "";
    const defaultDescription = activeResource && activeResource.description || "";
    const defaultValue = activeResource && activeResource.value || "";
    const defaultType = activeResource && activeResource.type || RESOURCE_TYPE_TEXT;
    const watchResourceTypeSelection = watch("type");

    const { uploadStatus, processingStatus } = useActionStatus<string>();
    const { status: uploadStatusValue, message: uploadErrorMessage } = uploadStatus;
    const { status: processingStatusValue, message: processingErrorMessage, value: processingValueMessage } = processingStatus;
    const { selectedImage, handleImageSelection } = useImageUpload();
    const { webUrl, changeWebUrl, processWebsite } = useWebsiteUpload(activeResource && activeResource.url as string || "");

    const USER_GENERATED_TYPES_LIST_DATA = createListCollection({ items: USER_RESOURCE_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });


    useEffect(() => {
        if (processingStatus.status === "success" && processingValueMessage) {
            setValue("value", processingValueMessage);
        }
    }, [processingStatus, processingValueMessage, setValue]);

    const handleCreateOrUpdateResource: SubmitHandler<Resource> = async (data: Resource) => {
        console.log(data);
        const dateData = new Date();
        data.last_modified = dateData.toISOString();
        if (activeResource) {
            data.id = activeResource.id;
        }
        if (selectedImage) {
            //this will be moved to a url returned from a cdn upload
            const convertedImage = await convertImageToDataUrl(selectedImage);
            data.url = convertedImage as string;
        }
        console.log(data);
        updateResourceValue(data);
    }
    const handleSubmitError: SubmitErrorHandler<Resource> = (data: FieldErrors<Resource>) => { console.log(data) };


    return (
        <form id={formName} onSubmit={handleSubmit(handleCreateOrUpdateResource, handleSubmitError)}>
            <Stack
                overflow="auto"
                maxHeight="100%">
                <Box className="description-data"
                    pl={4}
                    pr={4}>
                    <HStack >
                        <Box className="w-1/3">
                            <Square>

                                <ResourceCardImage src={activeResource?.url} type={activeResource && activeResource.type || watchResourceTypeSelection} />
                            </Square>
                        </Box>
                        <Box className="flex-1">
                            <Stack>
                                <Box>
                                    <Field label="Name">
                                        <Input defaultValue={defaultName} {...register("name")} />
                                    </Field>
                                </Box>
                                <Box>
                                    <Field label="Description">
                                        <Input defaultValue={defaultDescription} {...register("description")} />
                                    </Field>
                                </Box>
                            </Stack>
                        </Box>
                    </HStack>
                </Box>


                <HStack alignItems="flex-end"
                    pl={4}
                    pr={4}>
                    <Box className="w-1/3">

                        <Controller
                            name="type"
                            control={control}
                            defaultValue={defaultType}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Select a Content Type",
                                }
                            }}
                            render={({ field: { ...restField } }) => (
                                <SelectRoot
                                    variant="outline"
                                    collection={USER_GENERATED_TYPES_LIST_DATA}
                                    defaultValue={[defaultType]}
                                    onValueChange={(value) => {
                                        restField.onChange(value.value[0]);
                                    }}
                                    disabled={activeResource && activeResource.type ? true : false} >

                                    <SelectLabel>Resource type</SelectLabel>
                                    <SelectTrigger>
                                        <SelectValueText placeholder="Select Content Type" />
                                    </SelectTrigger>
                                    <SelectContent zIndex={100000}>
                                        {USER_GENERATED_TYPES_LIST_DATA.items.map((resource_type) => (
                                            <SelectItem key={`resource-generation-type-select-${resource_type.value}`} item={resource_type.value}>
                                                {resource_type.label}
                                            </SelectItem>
                                        )
                                        )}
                                    </SelectContent>
                                </SelectRoot>
                            )}
                        />



                    </Box>
                    <Box className="flex-1">
                        <Box visibility={activeResource && activeResource.type === RESOURCE_TYPE_IMAGE || watchResourceTypeSelection === RESOURCE_TYPE_IMAGE ? "" : "hidden"}>
                            <FileUploadRoot accept={["image/png", "image/jpg", "image/bmp"]} onChange={handleImageSelection} >
                                <FileUploadTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload />Upload file
                                    </Button>
                                </FileUploadTrigger>
                            </FileUploadRoot>
                        </Box>

                        <Box visibility={activeResource && activeResource.type === RESOURCE_TYPE_WEBSITE || watchResourceTypeSelection === RESOURCE_TYPE_WEBSITE ? "" : "hidden"}>
                            <Stack
                                direction="row">
                                <Input type="text" placeholder="URL" value={webUrl} onChange={changeWebUrl} />
                                <Button size="sm" variant="outline" onClick={processWebsite}>Process</Button>
                            </Stack>
                        </Box>
                    </Box>
                </HStack>

                {processingStatusValue === "pending" && <p>Processing...</p>}
                {processingStatusValue === "error" && <Text>{processingErrorMessage}</Text>}

                {activeResource && activeResource.type === RESOURCE_TYPE_QUIZ || watchResourceTypeSelection === RESOURCE_TYPE_QUIZ ?
                    <Quiz questions={activeResource?.quiz_questions || []} /> :
                    <Field label="Resource value" p={4}>
                        <Textarea rows={12} defaultValue={defaultValue} {...register("value")} disabled={processingStatusValue === "pending"} /></Field>
                }

                <Box>

                    {uploadStatusValue === "pending" && <p>Uploading...</p>}
                    {uploadStatusValue === "error" && <Text>{uploadErrorMessage}</Text>}
                    {uploadStatusValue === "success" && <Text>Uploaded Successfully</Text>}
                </Box>
            </Stack>
        </form>

    )



}

export default LibraryResourceUploader;