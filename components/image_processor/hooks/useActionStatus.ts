import { useContext } from "react";
import { ResourceEditorContext } from "@/context/resource_editor/provider";
import { StatusObject } from "@/types/globalTypes";



type ActionStatus<T> = {
    uploadStatus: StatusObject<T>;
    setUploadStatus: (status: StatusObject<T>) => void;
    processingStatus: StatusObject<T>;
    setProcessingStatus: (status: StatusObject<T>) => void;
}


export const useActionStatus = (): ActionStatus<any> => {

    const {
        processingStatus,
        setProcessingStatus,
        uploadStatus,
        setUploadStatus,
    } = useContext(ResourceEditorContext);


    return { uploadStatus, setUploadStatus, processingStatus, setProcessingStatus };
}