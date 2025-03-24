import ResourceListContainer from "@/components/resources/resource_card/ResourceListContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Resource } from "@/types/resourceTypes";

type TabbedResourceListProps = {
    tabData: { title: string, data: Map<string, Resource> }[];
}

export const TabbedResourceList = (props: TabbedResourceListProps) => {
    const { tabData } = props;

    return (
        <Tabs
            defaultValue={tabData[0].title}
            className="w-full h-full max-h-full flex relative"
        >
            <div className="flex-0">
                <h1 className="text-3xl font-bold mb-8">Library</h1>
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        {tabData.map((tab) => {
                            return <TabsTrigger key={tab.title + "-trigger"} value={tab.title}>{tab.title}</TabsTrigger>
                        })
                        }

                    </TabsList>
                </div>
            </div>
            <div className=" max-h-full h-full min-h-0 flex-1 relative">

                {tabData.map((tab) => {
                    return (
                        <TabsContent key={tab.title} value={tab.title} className="max-h-full h-full p-8 min-h-0 overflow-y-auto  no-scrollbar">
                            <ResourceListContainer listData={tab.data} />
                        </TabsContent>)
                })}
            </div>

        </Tabs>
    )

}

export default TabbedResourceList;