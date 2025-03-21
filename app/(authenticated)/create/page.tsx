import ParameterForm from "@/components/create/ParameterForm_new";
import ContentInputPanel from "@/components/create/ContentInputPanel";
import ContentCreationContextProvider from "@/context/create/provider";
import ResourceEditorContextProvider from "@/context/resource_editor/provider";
import SubmitResourceForm from "@/components/create/SubmitResourceForm";

const page = async () => {
    return (
        <ContentCreationContextProvider>
            <ResourceEditorContextProvider>

                <div className="flex-auto max-w-[1100px] min-w-[400px] w-full overflow-y-hidden mx-auto">
                    <div className="flex flex-col max-h-full h-full min-h-0 max-w-full w-full p-8 mx-auto" >

                        <ParameterForm />

                        <ContentInputPanel />

                        <SubmitResourceForm />

                    </div>
                </div>
            </ResourceEditorContextProvider>
        </ContentCreationContextProvider >
    )
}

export default page;