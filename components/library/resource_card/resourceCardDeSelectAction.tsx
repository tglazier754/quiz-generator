import { Button } from "@/components/ui/button";
import { ContentCreationContext } from "@/context/create/provider";
import { useContext } from "react";
import { CgClose } from "react-icons/cg";

type DeSelectActionsProps = {
    resourceId: string;
}

export const ResourceCardDeSelectAction = (props: DeSelectActionsProps) => {
    const { resourceId } = props;

    const { removeInputContent } = useContext(ContentCreationContext);

    const handleRemoveButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.stopPropagation) event.stopPropagation();
        removeInputContent(resourceId);
    }

    return (
        <>
            <Button variant="ghost" onClick={handleRemoveButton}>
                <CgClose />
            </Button>

        </>
    )
}