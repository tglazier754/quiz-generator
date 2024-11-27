import { Resource } from "@/types/resourceTypes";
import { useMap } from "./useMap";

type UseSelectCards = {
    selectedResources: Map<string, Resource>;
    selectionHandler: (selectedResource: Resource | undefined, state: boolean) => void;
    setAllResources: (resourceMap: Map<string, Resource>) => void;
}

export const useSelectResources = (): UseSelectCards => {

    const [map, actions] = useMap<string, Resource>();

    const selectionHandler = (selectedResource: Resource | undefined, state: boolean) => {
        if (selectedResource && selectedResource.id) {
            if (state) {
                actions.set(selectedResource.id, selectedResource);
            }
            else {
                actions.remove(selectedResource.id);
            }
        }
    }

    const setAllResources = (resourceMap?: Map<string, Resource>) => {
        if (resourceMap) {
            actions.setAll(resourceMap);
        }
    }


    return {
        selectedResources: map,
        selectionHandler,
        setAllResources
    }
}