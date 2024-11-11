"use client";

import { Resource } from "@/types/resourceTypes";
import { AspectRatio, Card, Circle, Float, Icon, Image, Show, Square } from "@chakra-ui/react";

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { TbTrash } from "react-icons/tb";
import { PiPencil } from "react-icons/pi";
import { ResourcesContext } from "@/context/resources/provider";
import { Avatar } from "../ui/avatar";
import { GiCheckMark } from "react-icons/gi";
import ResourceCardImage from "./resourceCardImage";
import { archiveExistingResource } from "@/utils/resources/server";
import { archiveSingleResource } from "@/utils/resources/client";

type ResourceCardProps = {
    resource: Resource;
    selected: boolean;
    onSelectHandler: (id: string, updatedState: boolean) => void;
}

export const ResourceCard = (props: ResourceCardProps) => {
    const { resource, selected, onSelectHandler } = props;

    const { setActiveResource, setIsDrawerOpen } = useContext(ResourcesContext);

    const handleSelection = () => {
        if (onSelectHandler) onSelectHandler(resource.id || "", !selected);
    }

    const handleEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.stopPropagation) event.stopPropagation();
        setActiveResource(resource);
        setIsDrawerOpen(true);
    }

    const handleArchiveButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.stopPropagation) event.stopPropagation();
        await archiveSingleResource(resource.id!);
        //TODO: remove this item from the resource list
    }

    return (
        <Card.Root h="100%" variant={selected ? "outline" : "subtle"} maxW="sm" onClick={handleSelection} >

            <AspectRatio ratio={16 / 9}>
                <ResourceCardImage src={resource.url} type={resource.type} name={resource.name} />
            </AspectRatio>

            <Show when={selected}>
                <Float placement="top-end" offsetX="1" offsetY="1">
                    <Square
                        bg="green.500"
                        size="1.5rem"
                        outline="0.2em solid"
                        outlineColor="bg"
                        borderRadius={2}
                    >
                        <Icon>
                            <GiCheckMark />
                        </Icon>
                    </Square>

                </Float>
            </Show>

            <Card.Body gap="1rem">
                <Card.Title lineHeight="1.2rem">{resource.name}</Card.Title>
                <Card.Description textOverflow="ellipsis" wordWrap="break-word" overflow="hidden" maxH="8em" lineHeight="1rem" >
                    {resource.description}
                </Card.Description>
            </Card.Body>
            <Card.Footer >
                <Button colorPalette="red" variant="ghost" onClick={handleArchiveButton} >
                    <TbTrash />
                </Button>
                <Button variant="outline" onClick={handleEditButton}><PiPencil /></Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default ResourceCard;