import { useContext, useState } from "react";
import { useResourceEdit } from "../image_processor/hooks/useResourceEdit";
import LibraryResourceUploader from "../image_processor/LibraryResourceUploader";
import { Button } from "../ui/button";
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Resource } from "@/types/resourceTypes";
import { ContentCreationContext } from "@/context/create/provider";

type ResourceUploaderContainerProps = {
    showTray: boolean,
    setShowTray: (value: boolean) => void;
    cancelAction: () => void;
}

export const ResourceUploaderContainer = (props: ResourceUploaderContainerProps) => {

    const { showTray, setShowTray, cancelAction } = props;
    const { setInputContent } = useContext(ContentCreationContext);
    const { submitResource } = useResourceEdit();
    const [resource, setResource] = useState<Resource | null>(null);

    const handleUpdateResourceData = (resourceData: Resource) => {
        setResource(resourceData);
    }

    const handleSubmit = async () => {
        if (submitResource && resource) {
            //TODO: Handle errors here
            const submittedResource = await submitResource(resource);
            setInputContent(submittedResource.id!, submittedResource);
            setShowTray(false);
        }
    }


    return (<>
        <DrawerRoot lazyMount size="lg" open={showTray} unmountOnExit onOpenChange={(e) => setShowTray(e.open)} key="new-drawer" closeOnInteractOutside={false}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button variant="outline">Add New</Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Existing Resources</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>

                    {/*TODO: Need a ResourceList that has a container
                                    that passes down a selection handler*/}

                    <LibraryResourceUploader updateResourceValue={handleUpdateResourceData} />

                </DrawerBody>
                <DrawerFooter>
                    <Button variant="ghost" onClick={cancelAction}>Cancel</Button>
                    <Button variant="surface" onClick={handleSubmit}>Create</Button>
                </DrawerFooter>

                <DrawerCloseTrigger />
            </DrawerContent>

        </DrawerRoot></>)
}

export default ResourceUploaderContainer;