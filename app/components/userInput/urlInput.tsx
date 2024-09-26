"use client";
import { Button, Input } from "@chakra-ui/react";
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
        //TODO: ensure that the url is valid before proceeding
        router.push(`/digest?url=${input}`);
    }

    return (
        <div className="url-input-container">
            <Input type="text" value={input} onChange={handleChange} />
            <Button onClick={handleSubmit}>Generate</Button>
        </div>
    )
}

export default UrlInput;