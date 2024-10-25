"use client";
import { Resource } from "@/types/resourceTypes";
import { convertImageToDataUrl } from "@/utils/images/client";
import { Checkbox, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./resources.scss";

type ResourceLineItemProps = {
    resource: Resource;
    onSelectHandler: (id: string, updatedState: boolean) => void;
}

export const ResourceLineItem = (props: ResourceLineItemProps) => {

    const { resource, onSelectHandler } = props;
    const [imageUrl, setImageUrl] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        const selected = isSelected;
        setIsSelected(!selected);
        onSelectHandler && onSelectHandler(resource.id || "", !selected);
    }

    useEffect(() => {
        if (resource.url) {
            if (typeof resource.url === "string") {
                setImageUrl(resource.url);
            }
            else if (typeof resource.url === "object") {
                //the url is a file, we need the base64
                convertImageToDataUrl(resource.url as File).then((url) => { setImageUrl(url as string) });
            }
        }
    }, [resource]);


    return (
        <>
            <Checkbox checked={isSelected} onChange={handleSelect} />
            <div className="image-container">
                <Image src={imageUrl} />
            </div>
            <Text>{resource.name}</Text>
            <Text>{resource.description}</Text>
        </>

    )

}

export default ResourceLineItem;