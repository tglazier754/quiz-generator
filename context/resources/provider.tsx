"use client";

import { IHash } from "@/types/globalTypes";
import { Resource } from "@/types/resourceTypes";
import { createContext, ReactElement, useRef, useState } from "react";

export type ResourceContext = {
    selectedResources: IHash;
    setSelectedResources: (hash: IHash) => void;
    activeResource?: Resource | null;
    setActiveResource: (resource: Resource | null) => void;
    isGenerating: boolean;
    setIsGenerating: (value: boolean) => void;
}

export const ResourcesContext = createContext<ResourceContext>({} as ResourceContext);

type ResourceContextProviderProps = {
    children: ReactElement;
}

export const ResourceContextProvider = ({ children }: ResourceContextProviderProps) => {

    const [selectedResources, setSelectedResources] = useState<IHash>({});
    const [activeResource, setActiveResource] = useState<Resource | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);


    return (
        <ResourcesContext.Provider value={{ selectedResources, setSelectedResources, activeResource, setActiveResource, isGenerating, setIsGenerating }}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourceContextProvider;