import { ResourcesContext } from "@/context/library/provider";
import { IHash } from "@/types/globalTypes";
import { Resource } from "@/types/resourceTypes";
import { useContext } from "react";

type UseSelectCards = {
    selectedResources: IHash<Resource>;
    selectionHandler: (selectedId: string, state: boolean) => void;
}

export const useSelectResources = (): UseSelectCards => {

    const { selectedResources, setSelectedResources } = useContext(ResourcesContext);

    const selectionHandler = (selectedId: string, state: boolean) => {
        console.log("selected");
        const selectedResourcesTemp = JSON.parse(JSON.stringify(selectedResources));
        if (state) {
            selectedResourcesTemp[selectedId] = state;
        }
        else {
            delete selectedResourcesTemp[selectedId];
        }

        setSelectedResources(selectedResourcesTemp);
    }


    return {
        selectedResources,
        selectionHandler
    }
}