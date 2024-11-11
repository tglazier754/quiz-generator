import { ResourcesContext } from "@/context/resources/provider";
import { useContext } from "react";

type UseSelectCards = {
    selectionHandler: (selectedId: string, state: boolean) => void;
}

//TODO: Rename this
export function useSelectResources<UseSelectCards>() {

    const { selectedResources, setSelectedResources } = useContext(ResourcesContext);

    const selectionHandler = (selectedId: string, state: boolean) => {
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