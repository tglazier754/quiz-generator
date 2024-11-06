"use client";

import { IHash, ResourceHash } from "@/types/globalTypes";
import { Resource } from "@/types/resourceTypes";
import { createContext, ReactElement, useRef, useState } from "react";

export type ResourceContext = {
    resourceMap: ResourceHash;
    setResourceMap: (resourceList: ResourceHash) => void;
    selectedResources: IHash;
    setSelectedResources: (hash: IHash) => void;
    activeResource?: Resource | null;
    setActiveResource: (resource: Resource | null) => void;
    isGenerating: boolean;
    setIsGenerating: (value: boolean) => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (value: boolean) => void;
}

export const ResourcesContext = createContext<ResourceContext>({} as ResourceContext);

type ResourceContextProviderProps = {
    children: ReactElement;
}

export const ResourceContextProvider = ({ children }: ResourceContextProviderProps) => {

    const [resourceMap, setResourceMap] = useState<ResourceHash>({});
    const [selectedResources, setSelectedResources] = useState<IHash>({});
    const [activeResource, setActiveResource] = useState<Resource | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);


    return (
        <ResourcesContext.Provider value={{ resourceMap, setResourceMap, selectedResources, setSelectedResources, activeResource, setActiveResource, isGenerating, setIsGenerating, isDrawerOpen, setIsDrawerOpen }}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourceContextProvider;