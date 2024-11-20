import { ResourceEditorContext } from "@/context/resource_editor/provider";
import { extractImageText } from "@/utils/images/client";
import { RefObject, useContext, useRef, useState } from "react";


export type ImageUploader = {
    imageSelectorRef: RefObject<HTMLInputElement>;
    selectedImage: File | null;
    handleImageSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const useImageUpload = (): ImageUploader => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const { setUploadStatus, setProcessingStatus } = useContext(ResourceEditorContext);

    const imageSelectorRef = useRef<HTMLInputElement>(null);

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            setSelectedImage(event.target.files[0]);
            handleImageProcess(event.target.files[0]);
        }
    }
    const handleImageProcess = async (selectedImage: File | null) => {
        if (selectedImage) {
            setUploadStatus({ status: "uninitialized" });
            setProcessingStatus({ status: "pending" });
            extractImageText(selectedImage).then((value) => {
                setProcessingStatus({ status: "success", value });
            }).catch((error) => {
                setProcessingStatus({ status: "error", message: error });
            })

        }
    }


    return { imageSelectorRef, handleImageSelection, selectedImage };

}