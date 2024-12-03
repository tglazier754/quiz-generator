import { useActionStatus } from "@/components/image_processor/hooks/useActionStatus";
import { StatusObject } from "@/types/globalTypes";
import { Resource } from "@/types/resourceTypes";
import { generateResource } from "@/utils/resources/client";

type ResourceCreation = {
    createResource: (type: string, inputIdList: string[]) => Promise<Resource>;
    resourceGenerationStatus: StatusObject;
}

export const useResourceCreation = () => {
    const { uploadStatus, setUploadStatus } = useActionStatus();

    const createResource = async (type: string, inputIdList: string[]) => {
        setUploadStatus({ status: "pending" });
        const generatedResource = await generateResource(type, inputIdList);
        if (generatedResource) {

            setUploadStatus({ status: "success" });
        }
        else {
            setUploadStatus({ status: "error", message: "Unable to create the resource" });
        }
        return generatedResource;
    }

    return { createResource, uploadStatus };
}

export default useResourceCreation;