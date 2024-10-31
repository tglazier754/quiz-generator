"use client";

import { Resource } from "@/types/resourceTypes";
import { Card, Heading, Text } from "@chakra-ui/react";

import { useState } from "react";

type ResourceCardProps = {
    resource: Resource;
    onSelectHandler: (id: string, updatedState: boolean) => void;
}

export const ResourceCard = (props: ResourceCardProps) => {
    const { resource, onSelectHandler } = props;

    const [isSelected, setIsSelected] = useState(false);

    const handleSelection = () => {
        setIsSelected(!isSelected);
        onSelectHandler(resource.id || "", isSelected);
    }

    return (
        <Card.Root maxW="sm" onClick={handleSelection} >
            <Card.Body>
                <Heading size="md">{resource.name}Test</Heading>
                <Text>{resource.description}</Text>
            </Card.Body>
        </Card.Root>
    )
}

export default ResourceCard;