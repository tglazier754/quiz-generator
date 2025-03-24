"use client";
import { ContentCreationContext } from "@/context/create/provider";
import { useContext, useState } from "react";
import ResourceList from "../library/resourceList";
import { useSelectResources } from "@/hooks/useSelectResources";
import { ResourceCardDeSelectAction } from "../library/resource_card/resourceCardDeSelectAction";
import ResourceUploaderContainer from "./ResourceUploaderContainer";
import ResourceSelectorContainer from "./ResourceSelectorContainer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";


export const ContentInputPanel = () => {

    const { inputContent } = useContext(ContentCreationContext);
    const [showExistingTray, setShowExistingTray] = useState(false);
    const [showNewTray, setShowNewTray] = useState(false);
    const { setAllResources } = useSelectResources();

    const cancelSelectionUpdate = () => {
        setAllResources(inputContent);
        setShowExistingTray(false);
        setShowNewTray(false);
    }

    return (
        <div className="w-full max-w-[800px] mx-auto">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Resource Inputs</CardTitle>
                    <CardDescription>Select the information you want to include in the generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">



                    <div className="flex-grow border-2 h-full max-h-full overflow-y-auto p-4">
                        <ResourceList compact resources={inputContent} cardActions={ResourceCardDeSelectAction} />
                    </div>

                </CardContent>

                <CardFooter>
                    <div className="flex flex-row gap-4">
                        <ResourceSelectorContainer cancelAction={cancelSelectionUpdate} setShowTray={setShowExistingTray} showTray={showExistingTray} />

                        <ResourceUploaderContainer cancelAction={cancelSelectionUpdate} setShowTray={setShowNewTray} showTray={showNewTray} />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ContentInputPanel;