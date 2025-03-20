import ResourceListContainer from "@/components/resources/resource_card/ResourceListContainer";
import { Resource } from "@/types/resourceTypes";
import { Box } from "@chakra-ui/react/box";
import { Tabs } from "@chakra-ui/react/tabs";

type TabbedResourceListProps = {
    tabData: { title: string, data: Map<string, Resource> }[];
}

export const TabbedResourceList = (props: TabbedResourceListProps) => {
    const { tabData } = props;

    return (
        <Tabs.Root
            defaultValue={tabData[0].title}
            className="w-full"
            height="100%"
            maxHeight="100%"
        >
            <div className="flex justify-center mb-8">
                <Tabs.List className="grid w-full max-w-md grid-cols-2">
                    {tabData.map((tab) => {
                        return <Tabs.Trigger key={tab.title + "-trigger"} value={tab.title}>{tab.title}</Tabs.Trigger>
                    })
                    }

                </Tabs.List>
            </div>

            <Box overflowY="auto" maxHeight="100%">

                {tabData.map((tab) => {
                    return (
                        <Tabs.Content key={tab.title} value={tab.title} className="space-y-4">
                            <ResourceListContainer listData={tab.data} />
                        </Tabs.Content>)
                })}
            </Box>

        </Tabs.Root>
    )

}

export default TabbedResourceList;