"use client"

import { RESOURCE_TYPE_IMAGE, RESOURCE_TYPE_TEXT, RESOURCE_TYPE_WEBSITE, testImageDataURl, USER_RESOURCE_TYPES } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";
import { convertImageToDataUrl, extractImageText } from "@/utils/images/client";
import { Button, HStack, Image, Input, Select, Square, Stack, StackItem, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";

export const LibraryResourceUploader = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [valueText, setValueText] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingError, setUploadingError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const imageSelectorRef = useRef<HTMLInputElement>(null);
    const [selectedType, setSelectedType] = useState(RESOURCE_TYPE_TEXT);

    const [isEditing, setIsEditing] = useState(false);

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    }

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files && event.target.files.length) {
            setSelectedImage(event.target.files[0]);
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

    const handleResourceUpload = async () => {
        setUploadSuccess(false);
        setIsUploading(true);
        const resource: Resource = {
            name,
            description,
            value: valueText,
            type: selectedType,
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
            const data = await result.json();
            setUploadSuccess(true);

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

    return (
        <div>
            <Stack>

                <div className="description-data">
                    <HStack >
                        <div className="w-1/3">
                            <Square>
                                <Image src={testImageDataURl} />
                            </Square>
                        </div>
                        <div className="flex-1">
                            <Stack>
                                <div>
                                    <Input placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div>
                                    <Input placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                </div>
                                <div>
                                    <Text>Tags will go here</Text>
                                </div>
                            </Stack>
                        </div>
                    </HStack>
                </div>


                <HStack >
                    <div className="w-1/3">
                        <Select placeholder="Resource Type" value={selectedType} onChange={handleTypeChange}>
                            {USER_RESOURCE_TYPES.map((resourceType) => { return <option value={resourceType}>{resourceType.replace("_", " ").toLowerCase()}</option> })}
                        </Select>
                    </div>
                    <div className="flex-1">
                        <div className={`${selectedType !== RESOURCE_TYPE_IMAGE ? "hidden" : ""}`}>
                            <Input id="image-selector" type="file" ref={imageSelectorRef} onChange={handleImageSelection} />

                            {selectedImage && <Button id="image-uploader" onClick={handleImageProcess}>Process</Button>}
                        </div>

                        <div className={`${selectedType !== RESOURCE_TYPE_WEBSITE ? "hidden" : ""}`}>
                            <Input type="text" placeholder="URL" value={url} onChange={(e) => { setUrl(e.target.value) }} />
                        </div>
                    </div>
                </HStack>

                {isProcessing && <p>Processing...</p>}
                <Textarea value={valueText} onChange={handleValueInputChange} disabled={isProcessing} />
                {processingError && <Text>{processingError}</Text>}
                <div>
                    <Button onClick={handleResourceUpload} disabled={isUploading}>Add Resource</Button>
                    {isUploading && <p>Uploading...</p>}
                    {uploadingError && <Text>{uploadingError}</Text>}
                    {uploadSuccess && <Text>Uploaded Successfully</Text>}
                </div>
            </Stack>
        </div>
    )



}

export default LibraryResourceUploader;