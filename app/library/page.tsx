import ResourceList from "@/components/resources/resourceList";
import { getAllResources } from "@/utils/resources/server";
import { Heading } from "@chakra-ui/react"


export default async function page() {

    //GET the resources list
    //const resources = await fetch("http://localhost:3000/api/resources")
    const resources = await getAllResources();
    const data = JSON.parse(resources || "");

    //TODO: create a context Provider wrapper here instead of putting components directly in this tree

    return (
        <>
            <Heading>Library</Heading>

            <ResourceList resources={data} />

        </>
    )
}
