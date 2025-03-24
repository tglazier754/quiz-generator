"use client";

import { useResourceEdit } from "../image_processor/hooks/useResourceEdit";
import { Button } from "../ui/button";
import { Resource } from "@/types/resourceTypes";
import { useActionStatus } from "./hooks/useActionStatus";
import { useRouter } from "next/navigation";
import LibraryResourceUploader from "./LibraryResourceUploader";

type LibraryResourceUploaderContainerProps = {
    activeResource?: Resource;
}

export const LibraryResourceUploaderContainer = (props: LibraryResourceUploaderContainerProps) => {

    const { activeResource } = props;
    const { submitResource } = useResourceEdit(activeResource);
    const { uploadStatus } = useActionStatus();
    const { status: uploadStatusValue } = uploadStatus;
    const router = useRouter();

    const handleSubmit = async (resource: Resource) => {
        if (submitResource && resource) {
            console.log(resource);
            const submittedResource = await submitResource(resource);
            router.push(`/resource?id=${submittedResource.id}`);
        }
    }


    return (
        <div
            className="w-full max-w-[900px] min-w-[400px] h-full max-h-full justify-self-center">
            <div>
                <h1 className="text-2xl font-bold mb-8">Manage Resource</h1>
                <LibraryResourceUploader formName="resource-uploader" key="resource-upload-page-uploader" activeResource={activeResource} updateResourceValue={handleSubmit} />
            </div>
            <div className="p-8">
                <Button type="submit" form="resource-uploader" disabled={uploadStatusValue === "pending"}>{`${activeResource && activeResource.id ? "Edit" : "Add"} Resource`}</Button>
            </div>
        </div >
    )
}

export default LibraryResourceUploaderContainer;