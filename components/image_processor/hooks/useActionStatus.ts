import { useContext } from "react";
import { ResourceEditorContext } from "@/context/resource_editor/provider";
import { StatusObject } from "@/types/globalTypes";



type ActionStatus = {
    uploadStatus: StatusObject;
    setUploadStatus: (status: StatusObject) => void;
    processingStatus: StatusObject;
    setProcessingStatus: (status: StatusObject) => void;
}


export const useActionStatus = (): ActionStatus => {

    const {
        processingStatus,
        setProcessingStatus,
        uploadStatus,
        setUploadStatus,
    } = useContext(ResourceEditorContext);


    return { uploadStatus, setUploadStatus, processingStatus, setProcessingStatus };
}