"use client";
import { Button, Card, CardBody, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./urlInput.scss";


export const UrlInput = () => {

    const router = useRouter();

    const [input, setInput] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value);
    }

    const handleSubmit = () => {
        //TODO: validate url before proceeding
        router.push(`/digest?url=${input}`);
    }

    return (
        <Card>
            <CardBody>
                <Stack>
                    <Input type="text" value={input} onChange={handleChange} />
                    <Button size="md" onClick={handleSubmit}>Generate</Button>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default UrlInput;