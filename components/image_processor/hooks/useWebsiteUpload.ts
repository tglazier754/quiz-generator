import { ResourceEditorContext } from "@/context/resource_editor/provider";
import { useContext, } from "react";
import { useInputController } from "./useInputController";
import { extractWebsiteContentFromURL } from "@/utils/website_summary/client";


export type WebsiteUploader = {
    webUrl: string;
    changeWebUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
    processWebsite: () => void;
}


export const useWebsiteUpload = (initialValue: string): WebsiteUploader => {
    const { value: webUrl, handleValueChange: changeWebUrl } = useInputController(initialValue);

    const { setUploadStatus, setProcessingStatus } = useContext(ResourceEditorContext);

    const processWebsite = async () => {
        //TODO: validate the url
        if (webUrl) {
            setUploadStatus({ status: "uninitialized" });
            setProcessingStatus({ status: "pending" });


            extractWebsiteContentFromURL(webUrl).then((value) => {
                setProcessingStatus({ status: "success", value });
            }).catch((error) => {
                setProcessingStatus({ status: "error", message: error });
            })

        }
    }


    return { webUrl, changeWebUrl, processWebsite };

}