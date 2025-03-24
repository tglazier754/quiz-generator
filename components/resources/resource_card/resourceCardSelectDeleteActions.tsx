import { Button } from "@/components/ui/button";
import { archiveSingleResource } from "@/utils/resources/client";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";

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
        <div className="max-w-full flex flex-row gap-4 justify-center">
            <Link href={
                {
                    pathname: '/resource',
                    query: { id: resourceId },
                }}>
                <Button
                    variant="outline"
                    onClick={handleEditButton}
                >
                    <Edit2Icon className="h-4 w-4 mr-2" />
                    View
                </Button>
            </Link>
            <Button
                variant="default"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Trash2Icon className="h-4 w-4 mr-2" />
                Delete
            </Button>




        </div>
    )
}