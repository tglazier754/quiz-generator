"use client"

import { RESOURCE_TYPE_IMAGE, RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_TEXT, RESOURCE_TYPE_WEBSITE, testImageDataURl, USER_RESOURCE_TYPES } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";
import { convertImageToDataUrl, extractImageText } from "@/utils/images/client";
import { Box, Button, createListCollection, HStack, Image, Input, Square, Stack, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../ui/file-button";
import { HiUpload } from "react-icons/hi";
import { BiPlus } from "react-icons/bi";
import { ResourcesContext } from "@/context/resources/provider";
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import Quiz from "../quiz/quiz";

export const LibraryResourceUploader = () => {


    const { resourceMap, setResourceMap, activeResource, setActiveResource, isDrawerOpen, setIsDrawerOpen, isGenerating } = useContext(ResourcesContext);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [name, setName] = useState(activeResource && activeResource.name || "");
    const [description, setDescription] = useState(activeResource && activeResource.description || "");
    const [url, setUrl] = useState(activeResource && activeResource.url as string || "");
    const [valueText, setValueText] = useState<string>(activeResource && activeResource.value || "");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingError, setUploadingError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const imageSelectorRef = useRef<HTMLInputElement>(null);
    const [selectedResourceType, setSelectedResourceType] = useState<string[]>([RESOURCE_TYPE_TEXT]);

    const USER_GENERATED_TYPES_LIST_DATA = createListCollection({ items: USER_RESOURCE_TYPES.map((type) => { return { label: type.replace("_", " ").toLowerCase(), value: type } }) });


    useEffect(() => {
        setName(activeResource && activeResource.name || "");
        setDescription(activeResource && activeResource.description || "");
        setUrl(activeResource && activeResource.url as string || "");
        setValueText(activeResource && activeResource.value || "");
    }, [activeResource]);

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(event);

        if (event.target.files && event.target.files.length) {
            setSelectedImage(event.target.files[0]);
            handleImageProcess();
        }
    }

    const handleImageProcess = async () => {
        if (selectedImage) {
            setUploadSuccess(false);
            setIsProcessing(true);
            extractImageText(selectedImage).then((value) => {
                setValueText(value);
            }).catch((error) => {
                setProcessingError(error);
            }).finally(() => {
                setIsProcessing(false);
            })

        }
    }

    const handleValueInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        setValueText(inputValue);
    }

    const handleCreateResourceUpload = async () => {
        setUploadSuccess(false);
        setIsUploading(true);
        const resource: Resource = {
            name,
            description,
            value: valueText,
            type: selectedResourceType[0],
            url: null,
        }
        if (selectedImage) {
            const convertedImage = await convertImageToDataUrl(selectedImage);
            resource.url = convertedImage as string;
        }
        const formData = new FormData();
        formData.append("data", JSON.stringify(resource));


        try {
            const result = await fetch("/api/resources", {
                method: "POST", body: formData
            });
            const addedResource = await result.json();
            setUploadSuccess(true);
            resourceMap[addedResource.id] = addedResource;

            setSelectedImage(null);
            if (imageSelectorRef.current) {
                imageSelectorRef.current.files = null;
                imageSelectorRef.current.value = "";
            }
        }
        catch (error) {
            console.log(error);
            setUploadingError(error as string);
        }
        finally {
            setIsUploading(false);
        }
    }

    const handleUpdateResourceUpload = async () => {
        console.log("update resource");
        setUploadSuccess(false);
        setIsUploading(true);
        const dateData = new Date();
        //2024-10-23 16:47:18.337551+00
        const resource: Resource = {
            ...activeResource,
            name,
            description,
            value: valueText,
            last_modified: dateData.toISOString()
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(resource));

        try {
            const result = await fetch("/api/resources", {
                method: "PUT", body: formData,
            });
            const updatedResult = await result.json();
            setUploadSuccess(true);

            console.log(updatedResult);
            resourceMap[updatedResult.id] = updatedResult;

            setSelectedImage(null);
            if (imageSelectorRef.current) {
                imageSelectorRef.current.files = null;
                imageSelectorRef.current.value = "";
            }
        }
        catch (error) {
            console.log(error);
            setUploadingError(error as string);
        }
        finally {
            setIsUploading(false);
        }
    }

    const resetView = () => {
        setActiveResource(null);
        setIsProcessing(false);
        setIsUploading(false);
        setUploadSuccess(false);
    }

    return (
        <DrawerRoot size="md" open={isDrawerOpen} onOpenChange={(e) => setIsDrawerOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button variant="outline" disabled={isGenerating} onClick={() => resetView()} >
                    <BiPlus />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerCloseTrigger />
                <DrawerHeader>
                    <DrawerTitle>Add or Update Resource</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                    <Box>
                        <Stack>
                            <Box className="description-data">
                                <HStack >
                                    <Box className="w-1/3">
                                        <Square>
                                            <Image src={testImageDataURl} alt="Uploaded Image" />
                                        </Square>
                                    </Box>
                                    <Box className="flex-1">
                                        <Stack>
                                            <Box>
                                                <Input variant="flushed" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                            </Box>
                                            <Box>
                                                <Input variant="flushed" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                            </Box>
                                            <Box>
                                                <Text>Tags will go here</Text>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </HStack>
                            </Box>


                            <HStack alignItems="flex-end">
                                <Box className="w-1/3">


                                    {activeResource ?
                                        <Input variant="flushed" disabled value={activeResource && activeResource.type || ""} />
                                        :
                                        <SelectRoot variant="outline" collection={USER_GENERATED_TYPES_LIST_DATA} onValueChange={(e) => setSelectedResourceType(e.value)} value={selectedResourceType}>
                                            <SelectLabel>Select resource type</SelectLabel>
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
                                    <Box className={`${selectedResourceType[0] !== RESOURCE_TYPE_IMAGE ? "hidden" : ""}`}>
                                        {/*<Input id="image-selector" type="file" ref={imageSelectorRef} onChange={handleImageSelection} />*/}

                                        <FileUploadRoot accept={["image/png", "image/jpg", "image/bmp"]} ref={imageSelectorRef} onChange={handleImageSelection}>
                                            <FileUploadTrigger asChild>
                                                <Button variant="outline" size="sm" >
                                                    <HiUpload />Upload file
                                                </Button>
                                            </FileUploadTrigger>
                                            <FileUploadList />
                                        </FileUploadRoot>

                                        {/*selectedImage && <Button id="image-uploader" onClick={handleImageProcess}>Process</Button>*/}
                                    </Box>

                                    <Box className={`${selectedResourceType[0] !== RESOURCE_TYPE_WEBSITE ? "hidden" : ""}`}>
                                        <Input type="text" placeholder="URL" value={url} onChange={(e) => { setUrl(e.target.value) }} />
                                    </Box>
                                </Box>
                            </HStack>

                            {isProcessing && <p>Processing...</p>}

                            {activeResource && activeResource.type === RESOURCE_TYPE_QUIZ || selectedResourceType[0] === RESOURCE_TYPE_QUIZ ?
                                <Quiz questions={activeResource?.quiz_questions || []} /> :
                                <Textarea rows={12} value={valueText} onChange={handleValueInputChange} disabled={isProcessing} />
                            }

                            {processingError && <Text>{processingError}</Text>}
                            <Box>

                                {isUploading && <p>Uploading...</p>}
                                {uploadingError && <Text>{uploadingError}</Text>}
                                {uploadSuccess && <Text>Uploaded Successfully</Text>}
                            </Box>
                        </Stack>
                    </Box>

                </DrawerBody>
                <DrawerFooter>
                    <Box>
                        <Button onClick={activeResource ? handleUpdateResourceUpload : handleCreateResourceUpload} disabled={isUploading}>{`${activeResource && activeResource.id ? "Edit" : "Add"} Resource`}</Button>
                    </Box>
                </DrawerFooter>
            </DrawerContent>
        </DrawerRoot>
    )



}

export default LibraryResourceUploader;