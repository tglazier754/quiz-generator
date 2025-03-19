import ResourceListContainer from "@/components/resources/resource_card/ResourceListContainer";
import { Resource } from "@/types/resourceTypes";
import { Tabs } from "@chakra-ui/react/tabs";

type TabbedResourceListProps = {
    tabData: { title: string, data: Map<string, Resource> }[];
}

export const TabbedResourceList = (props: TabbedResourceListProps) => {
    const { tabData } = props;
    /*//should be in context
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    // Count of selected items in current tab
    const selectedCount = selectedItems.filter((id) => currentItems.some((item) => item.id === id)).length

    // Toggle item selection
    const toggleSelection = (id: string) => {
        setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
    }

    // Clear all selections
    const clearSelections = () => {
        setSelectedItems([])
    }*/

    return (
        <Tabs.Root
            defaultValue={tabData[0].title}
            className="w-full"
        >
            <div className="flex justify-center mb-8">
                <Tabs.List className="grid w-full max-w-md grid-cols-2">
                    {tabData.map((tab) => {
                        return <Tabs.Trigger key={tab.title + "-trigger"} value={tab.title}>{tab.title}</Tabs.Trigger>
                    })
                    }

                </Tabs.List>
            </div>

            {tabData.map((tab) => {
                return (<Tabs.Content key={tab.title} value={tab.title} className="space-y-4">
                    <ResourceListContainer listData={tab.data} />
                </Tabs.Content>)
            })}


        </Tabs.Root>
    )

}

export default TabbedResourceList;