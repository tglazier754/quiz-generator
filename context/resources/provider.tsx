"use client";

import { IHash } from "@/types/globalTypes";
import { Resource } from "@/types/resourceTypes";
import { createContext, ReactElement, useRef, useState } from "react";

export type ResourceContext = {
    selectedResources: IHash;
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

    const selectedResources: IHash = useRef({});
    const [activeResource, setActiveResource] = useState<Resource | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);


    return (
        <ResourcesContext.Provider value={{ selectedResources, activeResource, setActiveResource, isGenerating, setIsGenerating }}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourceContextProvider;