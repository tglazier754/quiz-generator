"use client"

import { RESOURCE_TYPE_IMAGE, RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_TEXT, RESOURCE_TYPE_WEBSITE, USER_RESOURCE_TYPES } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";
import { Box, Button, createListCollection, Heading, HStack, Input, Square, Stack, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { FileUploadRoot, FileUploadTrigger } from "../ui/file-button";
import { HiUpload } from "react-icons/hi";
import Quiz from "../quiz/quiz";
import ResourceCardImage from "../library/resourceCardImage";
import { useResourceEdit } from "./hooks/useResourceEdit";
import { useImageUpload } from "./hooks/useImageUpload";
import { useActionStatus } from "./hooks/useActionStatus";
import { useInputController } from "./hooks/useInputController";
import { convertImageToDataUrl } from "@/utils/images/client";
import { useWebsiteUpload } from "./hooks/useWebsiteUpload";
import { Field } from "../ui/field";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

type LibraryResourceUploaderProps = {
    activeResource?: Resource | null;
}

export const LibraryResourceUploader = (props: LibraryResourceUploaderProps) => {

    const { activeResource } = props;

    const { value: name, handleValueChange: nameChange } = useInputController(activeResource && activeResource.name || "");
    const { value: description, handleValueChange: descriptionChange } = useInputController(activeResource && activeResource.description || "");
    const { value: value, setValue, handleValueChange: valueChange } = useInputController(activeResource && activeResource.value || "");
    const [selectedResourceType, setSelectedResourceType] = useState<string[]>([RESOURCE_TYPE_TEXT]);

    const { submitResource, updateQuizQuestion } = useResourceEdit(activeResource);
    const { uploadStatus, processingStatus } = useActionStatus();
    const { status: uploadStatusValue, message: uploadErrorMessage } = uploadStatus;
    const { status: processingStatusValue, message: processingErrorMessage, value: processingValueMessage } = processingStatus;
    const { selectedImage, handleImageSelection } = useImageUpload();
    const { webUrl, changeWebUrl, processWebsite } = useWebsiteUpload(activeResource && activeResource.url as string || "");

    const USER_GENERATED_TYPES_LIST_DATA = createListCollection({ items: USER_RESOURCE_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });


    useEffect(() => {
        if (processingStatus.status === "success" && processingValueMessage) {
            setValue(processingValueMessage);
        }
    }, [processingStatus, processingValueMessage, setValue]);

    //TODO: Make this code separate and testable
    const getConsolidatedResourceObject = async (): Promise<Resource> => {
        const dateData = new Date();
        const resource: Resource = {
            ...activeResource,
            name: name || "",
            description: description || "",
            value: value || "",
            type: activeResource ? activeResource.type : selectedResourceType[0],
            url: activeResource ? activeResource.url : webUrl,
            last_modified: dateData.toISOString()
        }
        if (selectedImage) {
            //this will be moved to a url returned from a cdn upload
            const convertedImage = await convertImageToDataUrl(selectedImage);
            resource.url = convertedImage as string;
        }
        return resource;
    }

    const handleSubmitResource = async () => {
        const resourceData = await getConsolidatedResourceObject();
        submitResource(resourceData);
    }

    return (

        <Stack
            width="100%"
            maxWidth="900px"
            minWidth="400px"
            height="100%"
            maxHeight="100%"
            position="absolute">

            <Link href="/library"><span><BiArrowBack />Library</span></Link>
            <Heading>Manage Resource</Heading>
            <Stack
                overflow="auto"
                maxHeight="100%">
                <Box className="description-data"
                    p={4}>
                    <HStack >
                        <Box className="w-1/3">
                            <Square>

                                <ResourceCardImage src={activeResource?.url} type={activeResource && activeResource.type || selectedResourceType[0]} />
                            </Square>
                        </Box>
                        <Box className="flex-1">
                            <Stack>
                                <Box>
                                    <Field label="Name">
                                        <Input value={name} onChange={nameChange} />
                                    </Field>
                                </Box>
                                <Box>
                                    <Field label="Description">
                                        <Input value={description} onChange={descriptionChange} />
                                    </Field>
                                </Box>
                            </Stack>
                        </Box>
                    </HStack>
                </Box>


                <HStack alignItems="flex-end" padding="4">
                    <Box className="w-1/3">


                        {activeResource ?
                            <Input variant="flushed" disabled value={activeResource && activeResource.type || ""} />
                            :
                            <SelectRoot variant="outline" collection={USER_GENERATED_TYPES_LIST_DATA} onValueChange={(e) => setSelectedResourceType(e.value)} value={selectedResourceType}>
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
                        }


                    </Box>
                    <Box className="flex-1">
                        <Box visibility={activeResource && activeResource.type === RESOURCE_TYPE_IMAGE || selectedResourceType[0] === RESOURCE_TYPE_IMAGE ? "" : "hidden"}>
                            <FileUploadRoot accept={["image/png", "image/jpg", "image/bmp"]} onChange={handleImageSelection} >
                                <FileUploadTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload />Upload file
                                    </Button>
                                </FileUploadTrigger>
                            </FileUploadRoot>
                        </Box>

                        <Box visibility={activeResource && activeResource.type === RESOURCE_TYPE_WEBSITE || selectedResourceType[0] === RESOURCE_TYPE_WEBSITE ? "" : "hidden"}>
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

                {activeResource && activeResource.type === RESOURCE_TYPE_QUIZ || selectedResourceType[0] === RESOURCE_TYPE_QUIZ ?
                    <Quiz questions={activeResource?.quiz_questions || []} questionUpdateHandler={updateQuizQuestion} /> :
                    <Field label="Resource value" p={4}>
                        <Textarea rows={12} value={value} onChange={valueChange} disabled={processingStatusValue === "pending"} /></Field>
                }

                <Box>

                    {uploadStatusValue === "pending" && <p>Uploading...</p>}
                    {uploadStatusValue === "error" && <Text>{uploadErrorMessage}</Text>}
                    {uploadStatusValue === "success" && <Text>Uploaded Successfully</Text>}
                </Box>
            </Stack>
            <Box
                p={4}>
                <Button onClick={handleSubmitResource} disabled={uploadStatusValue === "pending"}>{`${activeResource && activeResource.id ? "Edit" : "Add"} Resource`}</Button>
            </Box>
        </Stack>


    )



}

export default LibraryResourceUploader;