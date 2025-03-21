"use client"

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { BiUser } from "react-icons/bi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const UserMenu = () => {
    const supabaseConnection = createClient();
    const router = useRouter();

    const logoutAction = async () => {
        const { error } = await supabaseConnection.auth.signOut();
        if (!error) {
            return router.replace("/login");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <BiUser className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50">
                <DropdownMenuItem onClick={logoutAction}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}

export default UserMenu;