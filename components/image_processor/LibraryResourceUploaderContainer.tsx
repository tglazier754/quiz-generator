"use client";

import { useResourceEdit } from "../image_processor/hooks/useResourceEdit";
import { Button } from "../ui/button";
import { Resource } from "@/types/resourceTypes";
import { Box, Heading, Stack } from "@chakra-ui/react";
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
        <Stack
            width="100%"
            maxWidth="900px"
            minWidth="400px"
            height="100%"
            maxHeight="100%"
            justifySelf="center">
            <Heading>Manage Resource</Heading>
            <LibraryResourceUploader formName="resource-uploader" key="resource-upload-page-uploader" activeResource={activeResource} updateResourceValue={handleSubmit} />

            <Box
                p={4}>
                <Button type="submit" form="resource-uploader" disabled={uploadStatusValue === "pending"}>{`${activeResource && activeResource.id ? "Edit" : "Add"} Resource`}</Button>
            </Box>
        </Stack>)
}

export default LibraryResourceUploaderContainer;