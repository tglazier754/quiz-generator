"use client";

import { IHash, StatusObject } from "@/types/globalTypes";
import { QuizQuestion } from "@/types/resourceTypes";
import { createContext, ReactElement, useState } from "react";


export type ResourceEditorContext = {
    uploadStatus: StatusObject;
    setUploadStatus: (status: StatusObject) => void;
    processingStatus: StatusObject;
    setProcessingStatus: (status: StatusObject) => void;
    quizQuestionChanges: IHash<QuizQuestion>;
}

export const ResourceEditorContext = createContext<ResourceEditorContext>({} as ResourceEditorContext);

type ResourceEditorContextProviderProps = {
    children: ReactElement;
}

export const ResourceEditorContextProvider = ({ children }: ResourceEditorContextProviderProps) => {


    const quizQuestionChanges: IHash<QuizQuestion> = {};

    const [processingStatus, setProcessingStatus] = useState<StatusObject>({ status: "uninitialized", message: null });
    const [uploadStatus, setUploadStatus] = useState<StatusObject>({ status: "uninitialized", message: null });

    return (
        <ResourceEditorContext.Provider
            value={
                {
                    processingStatus,
                    setProcessingStatus,
                    uploadStatus,
                    setUploadStatus,
                    quizQuestionChanges
                }
            }>
            {children}
        </ResourceEditorContext.Provider>
    );
}

export default ResourceEditorContextProvider;