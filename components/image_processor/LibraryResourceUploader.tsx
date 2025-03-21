"use client"

import { RESOURCE_TYPE_IMAGE, RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_TEXT, RESOURCE_TYPE_WEBSITE, USER_RESOURCE_TYPES } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";
import { useEffect } from "react";
import { HiUpload } from "react-icons/hi";
import Quiz from "../quiz/quiz";
import ResourceCardImage from "../library/resource_card/resourceCardImage";
import { useImageUpload } from "./hooks/useImageUpload";
import { useActionStatus } from "./hooks/useActionStatus";
import { convertImageToDataUrl } from "@/utils/images/client";
import { useWebsiteUpload } from "./hooks/useWebsiteUpload";
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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
            <div
                className="overflow-auto max-h-full">
                <div className="description-data pl-8 pr-8">
                    <div className="flex flex-col" >
                        <div className="w-1/3">
                            <span>image</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col" >
                                <div>
                                    <Label>Name</Label>
                                    <Input defaultValue={defaultName} {...register("name")} />
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Input defaultValue={defaultDescription} {...register("description")} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col items-end  pl-8 pr-8" >
                    <div className="w-1/3">

                        <Select disabled={activeResource && activeResource.type ? true : false} >

                            <Label>Resource type</Label>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Content Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {USER_RESOURCE_TYPES.map((resource_type) => (
                                    <SelectItem key={`resource-generation-type-select-${resource_type}`} value={resource_type}>
                                        {resource_type}
                                    </SelectItem>
                                )
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex-1">
                        {activeResource && activeResource.type === RESOURCE_TYPE_IMAGE || watchResourceTypeSelection === RESOURCE_TYPE_IMAGE ? <div >

                            <Input type="file" onChange={handleImageSelection} />

                            <Button variant="outline" size="sm">
                                <HiUpload />Upload file
                            </Button>
                        </div> : null}

                        {activeResource && activeResource.type === RESOURCE_TYPE_WEBSITE || watchResourceTypeSelection === RESOURCE_TYPE_WEBSITE ? <div>
                            <div className="flex flex-row items-end  pl-8 pr-8" >
                                <Input type="text" placeholder="URL" value={webUrl} onChange={changeWebUrl} />
                                <Button size="sm" variant="outline" onClick={processWebsite}>Process</Button>
                            </div>
                        </div> : null}
                    </div>
                </div>

                {processingStatusValue === "pending" && <p>Processing...</p>}
                {processingStatusValue === "error" && <span>{processingErrorMessage}</span>}

                {activeResource && activeResource.type === RESOURCE_TYPE_QUIZ || watchResourceTypeSelection === RESOURCE_TYPE_QUIZ ?
                    <Quiz questions={activeResource?.quiz_questions || []} /> :
                    <>
                        <Label>Resource value</Label>
                        <Textarea rows={12} defaultValue={defaultValue} {...register("value")} disabled={processingStatusValue === "pending"} />
                    </>
                }

                <div>
                    {uploadStatusValue === "pending" && <p>Uploading...</p>}
                    {uploadStatusValue === "error" && <span>{uploadErrorMessage}</span>}
                    {uploadStatusValue === "success" && <span>Uploaded Successfully</span>}
                </div>
            </div>
        </form>

    )



}

export default LibraryResourceUploader;