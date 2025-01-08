"use client"

import { createClient } from "@/utils/supabase/client";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { BiUser } from "react-icons/bi";

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
        <MenuRoot>
            <MenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <BiUser className="h-5 w-5" />
                </Button>
            </MenuTrigger>
            <MenuContent zIndex="1000000">
                <MenuItem value="Log Out" onClick={logoutAction}>Log Out</MenuItem>
            </MenuContent>
        </MenuRoot>
    )

}

export default UserMenu;