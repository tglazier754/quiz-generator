import { useContext } from "react";
import { useResourceEdit } from "../image_processor/hooks/useResourceEdit";
import { Button } from "../ui/button";
import { Resource } from "@/types/resourceTypes";
import { ContentCreationContext } from "@/context/create/provider";
import LibraryResourceUploader from "../image_processor/LibraryResourceUploader";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

type ResourceUploaderContainerProps = {
    showTray: boolean,
    setShowTray: (value: boolean) => void;
    cancelAction: () => void;
}

export const ResourceUploaderContainer = (props: ResourceUploaderContainerProps) => {

    const { showTray, setShowTray, cancelAction } = props;
    const { setInputContent } = useContext(ContentCreationContext);
    const { submitResource } = useResourceEdit();

    const handleSubmit = async (resource: Resource) => {
        if (submitResource && resource) {
            //TODO: Handle errors here
            const submittedResource = await submitResource(resource);
            setInputContent(submittedResource.id!, submittedResource);
            setShowTray(false);
        }
    }


    return (
        <Drawer key="new-drawer" direction="right">
            <DrawerTrigger asChild>
                <Button variant="outline">Add New</Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Existing Resources</DrawerTitle>
                </DrawerHeader>

                {/*TODO: Need a ResourceList that has a container
                                    that passes down a selection handler*/}

                <LibraryResourceUploader formName="resource-uploader" updateResourceValue={handleSubmit} />

                <DrawerFooter>
                    <DrawerClose >
                        <Button variant="ghost" onClick={cancelAction}>Cancel</Button>
                    </DrawerClose>
                    <Button variant="outline" type="submit" form="resource-uploader">Create</Button>
                </DrawerFooter>


            </DrawerContent>

        </Drawer>)
}

export default ResourceUploaderContainer;