"use client";

import { Resource } from "@/types/resourceTypes";
import { AspectRatio, Card, Heading, Image, Text } from "@chakra-ui/react";

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { TbTrash } from "react-icons/tb";
import { PiPencil } from "react-icons/pi";
import { ResourcesContext } from "@/context/resources/provider";

type ResourceCardProps = {
    resource: Resource;
    onSelectHandler: (id: string, updatedState: boolean) => void;
}

export const ResourceCard = (props: ResourceCardProps) => {
    const { resource, onSelectHandler } = props;

    const [isSelected, setIsSelected] = useState(false);
    const { setActiveResource, setIsDrawerOpen } = useContext(ResourcesContext);

    const handleSelection = () => {
        const selected = isSelected;
        setIsSelected(!selected);
        if (onSelectHandler) onSelectHandler(resource.id || "", !selected);
    }

    const handleEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.stopPropagation) event.stopPropagation();
        console.log("Edit");
        setActiveResource(resource);
        setIsDrawerOpen(true);
    }

    return (
        <Card.Root colorPalette={isSelected ? "blue" : "current"} h="100%" variant={isSelected ? "outline" : "subtle"} maxW="sm" onClick={handleSelection} >
            <AspectRatio ratio={16 / 9}>
                {resource.url ? <Image src={resource.url as string} alt={resource.name} /> : <></>}
            </AspectRatio>

            <Card.Body gap="1rem">
                <Card.Title lineHeight="1.2rem">{resource.name}</Card.Title>
                <Card.Description textOverflow="ellipsis" wordWrap="break-word" overflow="hidden" maxH="8em" lineHeight="1rem" >
                    {resource.description}
                </Card.Description>
            </Card.Body>
            <Card.Footer >
                <Button colorPalette="red" variant="ghost" onClick={handleEditButton} >
                    <TbTrash />
                </Button>
                <Button variant="outline" onClick={handleEditButton}><PiPencil /></Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default ResourceCard;