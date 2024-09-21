import React from "react";
import { convert } from "html-to-text";

import { NextResponse } from "next/server";

const page = async () => {
    const response = await fetch('https://en.wikipedia.org/wiki/Toronto_Blue_Jays');
    const data = await response.text();

    //const stripped = strip(data);
    const converted = convert(data, {
        selectors: [
            { selector: 'main', options: { baseUrl: 'https://example.com' } },
            { selector: 'a', format: 'skip' },
            { selector: 'img', format: 'skip' },
            { selector: 'input', format: 'skip' },
            { selector: 'form', format: 'skip' },
            { selector: 'iframe', format: 'skip' },
        ]
    });


    return <div>{ converted } < /div>

}

export async function POST(request: Request) {
    return NextResponse.json({ message: "Hello World" }, { status: 200 });

}