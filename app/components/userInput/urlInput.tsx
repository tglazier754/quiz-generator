"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export const UrlInput = () => {

    const router = useRouter();

    const [input, setInput] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value);
    }

    const handleSubmit = () => {
        router.push(`/digest?url=${input}`);
    }

    return (
        <div className="url-input-container">
            <input type="text" value={input} onChange={handleChange} />
            <button onClick={handleSubmit}>Generate</button>
        </div>
    )
}

export default UrlInput;