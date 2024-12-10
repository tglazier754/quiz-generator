"use client";

import { Resource } from "@/types/resourceTypes";
import { AspectRatio, Card, Float, Show, Square } from "@chakra-ui/react";
import { GiCheckMark } from "react-icons/gi";
import ResourceCardImage from "./resourceCardImage";
import { ReactElement } from "react";

type ResourceCardProps = {
    resource: Resource;
    selected: boolean;
    compact: boolean;
    onSelectHandler: (id: string, updatedState: boolean) => void;
    actionButtons?: ReactElement;
}

export const ResourceCard = (props: ResourceCardProps) => {
    const { resource, selected, compact, onSelectHandler, actionButtons } = props;

    const handleSelection = () => {
        if (onSelectHandler) onSelectHandler(resource.id || "", !selected);
    }

    return (
        <Card.Root height="100%" variant="elevated" size="sm" onClick={handleSelection} >

            <AspectRatio display={compact ? "none" : "block"} ratio={16 / 10}>
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
                        <GiCheckMark />
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
                {actionButtons}
            </Card.Footer>
        </Card.Root>
    )
}

export default ResourceCard;


/*<Button colorPalette="red" variant="ghost" onClick={handleArchiveButton} >
                    <TbTrash />
                </Button>
                <Link href={
                    {
                        pathname: '/resource',
                        query: { id: resource.id },
                    }}>
                    < Button variant="outline" onClick={handleEditButton}><PiPencil /></Button>
                </Link>
                */