
import ResourceActionsPanel from "@/components/library/resourceActions";
import ResourceList from "@/components/library/resourceList";
import { getAllResources } from "@/utils/resources/server";
import { Box, Heading } from "@chakra-ui/react"


export default async function page() {

    const resources = await getAllResources();
    const data = JSON.parse(resources || "");

    //TODO: create a context Provider wrapper here instead of putting components directly in this tree

    return (
        <div>
            <Box className="w-screen  h-12 p-0">
                <ResourceActionsPanel />
            </Box>
            <Heading>Library</Heading>

            <ResourceList resources={data} />

        </div>
    )
}
