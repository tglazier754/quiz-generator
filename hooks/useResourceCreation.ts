import { useActionStatus } from "@/components/image_processor/hooks/useActionStatus";
import { StatusObject } from "@/types/globalTypes";
import { Resource } from "@/types/resourceTypes";
import { generateResource, ResourceGenerationParams } from "@/utils/resources/client";

type ResourceCreation = {
    createResource: (params: ResourceGenerationParams, inputIdList: string[]) => Promise<Resource>;
    resourceGenerationStatus: StatusObject<Resource>;
}

export const useResourceCreation = () => {
    const { uploadStatus, setUploadStatus } = useActionStatus();

    const createResource = async (params: ResourceGenerationParams, inputIdList: string[]) => {
        setUploadStatus({ status: "pending" });
        console.log(params);
        const generatedResource = await generateResource(params, inputIdList);
        if (generatedResource) {

            setUploadStatus({ status: "success", value: generatedResource });
        }
        else {
            setUploadStatus({ status: "error", message: "Unable to create the resource" });
        }
        return generatedResource;
    }

    return { createResource, uploadStatus };
}

export default useResourceCreation;