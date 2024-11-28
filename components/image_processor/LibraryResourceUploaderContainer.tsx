"use client";

import { useState } from "react";
import { useResourceEdit } from "../image_processor/hooks/useResourceEdit";
import LibraryResourceUploader from "../image_processor/LibraryResourceUploader";
import { Button } from "../ui/button";
import { Resource } from "@/types/resourceTypes";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useActionStatus } from "./hooks/useActionStatus";
import { useRouter } from "next/navigation";

type LibraryResourceUploaderContainerProps = {
    activeResource?: Resource;
}

export const LibraryResourceUploaderContainer = (props: LibraryResourceUploaderContainerProps) => {

    const { activeResource } = props;
    const { submitResource } = useResourceEdit();
    const { uploadStatus } = useActionStatus();
    const { status: uploadStatusValue, message: uploadErrorMessage } = uploadStatus;
    const [resource, setResource] = useState<Resource | null>(null);
    const router = useRouter();

    const handleUpdateResourceData = (resourceData: Resource) => {
        setResource(resourceData);
    }

    const handleSubmit = async () => {
        if (submitResource && resource) {
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
            <LibraryResourceUploader key="resource-upload-page-uploader" activeResource={activeResource} updateResourceValue={handleUpdateResourceData} />

            <Box
                p={4}>
                <Button onClick={handleSubmit} disabled={uploadStatusValue === "pending"}>{`${activeResource && activeResource.id ? "Edit" : "Add"} Resource`}</Button>
            </Box>
        </Stack>)
}

export default LibraryResourceUploaderContainer;