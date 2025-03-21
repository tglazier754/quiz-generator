"use client";
import useResourceCreation from "@/hooks/useResourceCreation";
import { Button } from "../ui/button";



export const SubmitResourceForm = () => {


    const { createResource, uploadStatus } = useResourceCreation();

    return (
        <div className="w-full max-w-[800px] mx-auto">
            <Button
                disabled={uploadStatus.status === "pending"}
                type="submit">
                {uploadStatus.status === "pending" ? "Loading..." : "Create"}
            </Button>
        </div>
    )
}

export default SubmitResourceForm;