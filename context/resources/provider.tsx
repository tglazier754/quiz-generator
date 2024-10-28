"use client";

import { IHash } from "@/types/globalTypes";
import { createContext, ReactElement, useRef } from "react";

export type ResourceContext = {
    selectedResources: IHash;
}

export const ResourcesContext = createContext<ResourceContext>({} as ResourceContext);

type ResourceContextProviderProps = {
    children: ReactElement;
}

export const ResourceContextProvider = ({ children }: ResourceContextProviderProps) => {

    const selectedResources: IHash = useRef({});


    return (
        <ResourcesContext.Provider value={{ selectedResources }}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourceContextProvider;