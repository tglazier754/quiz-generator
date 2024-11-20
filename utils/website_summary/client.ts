import { convert } from "html-to-text";


export const extractWebsiteContentFromURL = async (url: string) => {

    //TODO: handle errors here using a proper promise structure
    if (url && typeof url === "string") {
        //pull the html data of the provided url
        const response = await fetch(url);
        const data = await response.text();

        //cleanse the data so that we don't have all the html boilerplate
        const converted = convert(data, {
            selectors: [
                { selector: 'main' },
                { selector: 'a', format: 'skip' },
                { selector: 'img', format: 'skip' },
                { selector: 'input', format: 'skip' },
                { selector: 'form', format: 'skip' },
                { selector: 'iframe', format: 'skip' },
            ]
        });
        console.log(converted);
        return converted;
    }

}