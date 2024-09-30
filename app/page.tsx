
import React from "react";
import UrlInput from "./components/userInput/urlInput";


type PageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const page = async (props: PageProps) => {
    const { searchParams } = props;
    console.log(searchParams);

    //get the user's url input, redirect them to the digest page

    //TODO: Allow the user to provide text instead of a url

    return <div className="centered-container"><UrlInput /></div>
}


export default page;