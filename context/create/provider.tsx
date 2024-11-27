"use client";

import { useMap } from "@/hooks/useMap";
import { IHash, StatusObject } from "@/types/globalTypes";
import { QuizQuestion, Resource } from "@/types/resourceTypes";
import { createContext, ReactElement, useState } from "react";

export type ContentCreationContext = {


    creationStatus: StatusObject;
    setCreationStatus: (status: StatusObject) => void;
    resourceUploadStatus: StatusObject;
    setResourceUploadStatus: (status: StatusObject) => void;
    inputContent: Map<string, Resource>;
    setInputContent: (key: string, resource: Resource) => void;
    setAllInputContent: (resources: Map<string, Resource>) => void;
    removeInputContent: (id: string) => void;
}

export const ContentCreationContext = createContext<ContentCreationContext>({} as ContentCreationContext);

type ResourceEditorContextProviderProps = {
    children: ReactElement;
}

export const ContentCreationContextProvider = ({ children }: ResourceEditorContextProviderProps) => {

    const [map, actions] = useMap<string, Resource>();

    const [creationStatus, setCreationStatus] = useState<StatusObject>({ status: "uninitialized", message: null });
    const [resourceUploadStatus, setResourceUploadStatus] = useState<StatusObject>({ status: "uninitialized", message: null });

    return (
        <ContentCreationContext.Provider
            value={
                {
                    creationStatus,
                    setCreationStatus,
                    resourceUploadStatus,
                    setResourceUploadStatus,
                    inputContent: map,
                    setInputContent: actions.set,
                    setAllInputContent: actions.setAll,
                    removeInputContent: actions.remove
                }
            }>
            {children}
        </ContentCreationContext.Provider>
    );
}

export default ContentCreationContextProvider;