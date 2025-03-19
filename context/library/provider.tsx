"use client";

import { useSelectResources } from "@/hooks/useSelectResources";
import { IHash } from "@/types/globalTypes";
import { Resource } from "@/types/resourceTypes";
import { createContext, ReactElement, useState } from "react";

export type ResourceContext = {
    resourceMap: IHash<Resource>;
    setResourceMap: (resourceList: IHash<Resource>) => void;
    selectedResources: Map<string, Resource>;
    selectResource: (resource: Resource, state: boolean) => void;
    clearSelectedResources: () => void;
    selectAllResources: (resourceList: Map<string, Resource>) => void;
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
    const { selectedResources, selectionHandler, clearSelectedResources, setAllResources } = useSelectResources();
    const [activeResource, setActiveResource] = useState<Resource | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);


    return (
        <ResourcesContext.Provider value={{ resourceMap, setResourceMap, selectedResources, selectResource: selectionHandler, clearSelectedResources, selectAllResources: setAllResources, activeResource, setActiveResource, isGenerating, setIsGenerating, isDrawerOpen, setIsDrawerOpen }}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourceContextProvider;