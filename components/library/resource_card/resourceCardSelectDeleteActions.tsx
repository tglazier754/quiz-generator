import { Button } from "@/components/ui/button";
import { archiveSingleResource } from "@/utils/resources/client";
import Link from "next/link";
import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";

type SelectDeleteActionsProps = {
    resourceId: string;
}

export const ResourceCardSelectDeleteActions = (props: SelectDeleteActionsProps) => {
    const { resourceId } = props;
    const handleEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.stopPropagation) event.stopPropagation();
    }

    const handleArchiveButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.stopPropagation) event.stopPropagation();
        await archiveSingleResource(resourceId);
        //TODO: remove this item from the resource list
    }

    return (
        <>
            <Button variant="ghost" onClick={handleArchiveButton} >
                <TbTrash />
            </Button>
            <Link href={
                {
                    pathname: '/resource',
                    query: { id: resourceId },
                }}>
                < Button variant="outline" onClick={handleEditButton}><PiPencil /></Button>
            </Link>
        </>
    )
}