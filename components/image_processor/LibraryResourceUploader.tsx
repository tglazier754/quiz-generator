"use client"

import { Resource } from "@/types/resourceTypes";
import { convertImageToDataUrl, extractImageText } from "@/utils/images/client";
import { Button, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useMemo, useRef, useState } from "react";

export const LibraryResourceUploader = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [valueText, setValueText] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const imageSelectorRef = useRef<HTMLInputElement>(null);

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files && event.target.files.length) {
            setSelectedImage(event.target.files[0]);
        }
    }

    const handleImageProcess = async () => {
        if (selectedImage) {
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

        const resource: Resource = {
            name,
            description,
            value: valueText,
            type: "LIBRARY",
            image_url: null,
        }
        if (selectedImage) {
            const convertedImage = await convertImageToDataUrl(selectedImage);
            resource.image_url = convertedImage as string;
        }
        console.log(selectedImage);
        const formData = new FormData();
        formData.append("data", JSON.stringify(resource));
        /*if (selectedImage) {
            formData.append("image", selectedImage);
        }*/


        try {
            const result = await fetch("/api/resources", {
                method: "POST", body: formData
            });
            const data = await result.json();
            console.log(data);

            //reset the data

            setSelectedImage(null);
            if (imageSelectorRef.current) {
                imageSelectorRef.current.files = null;
                imageSelectorRef.current.value = "";
            }
        }
        catch (error) {
            console.log(error);
        }


    }


    return (
        <div>
            <Stack>
                <div>
                    <Input placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div>
                    <Input placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </div>
                <div>
                    <Input id="image-selector" type="file" ref={imageSelectorRef} onChange={handleImageSelection} />
                    {selectedImage && <Button id="image-uploader" onClick={handleImageProcess}>Process</Button>}
                </div>
                {isProcessing && <p>Processing...</p>}
                <Textarea value={valueText} onChange={handleValueInputChange} disabled={isProcessing} />
                {processingError && <Text>{processingError}</Text>}
                <div>
                    <Button onClick={handleResourceUpload}>Add Resource</Button>
                </div>
            </Stack>
        </div>
    )



}

export default LibraryResourceUploader;