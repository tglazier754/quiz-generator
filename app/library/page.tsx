import ResourceLineItem from "@/components/resources/resourceLineItem";
import ResourceList from "@/components/resources/resourceList";
import { Resource } from "@/types/resourceTypes";
import { Heading } from "@chakra-ui/react"


export const page = async () => {

    //GET the resources list
    const resources = await fetch("http://localhost:3000/api/resources")
    const data = await resources.json();

    //TODO: create a context Provider wrapper here instead of putting components directly in this tree

    return (
        <>
            <Heading>Library</Heading>

            <ResourceList resources={data} />

        </>
    )
}

export default page;