"use client";

import { useSelectResources } from "@/hooks/useSelectResources";
import { IHash } from "@/types/globalTypes";
import { Resource, ResourceHash } from "@/types/resourceTypes";
import { createContext, ReactElement, useRef, useState } from "react";

export type ResourceContext = {
    resourceMap: IHash<Resource>;
    setResourceMap: (resourceList: IHash<Resource>) => void;
    selectedResources: Map<string, Resource>;
    selectResource: (resource: Resource, state: boolean) => void;
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

    const [resourceMap, setResourceMap] = useState<IHash<Resource>>({});
    const { selectedResources, selectionHandler } = useSelectResources();
    const [activeResource, setActiveResource] = useState<Resource | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);


    return (
        <ResourcesContext.Provider value={{ resourceMap, setResourceMap, selectedResources, selectResource: selectionHandler, activeResource, setActiveResource, isGenerating, setIsGenerating, isDrawerOpen, setIsDrawerOpen }}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourceContextProvider;