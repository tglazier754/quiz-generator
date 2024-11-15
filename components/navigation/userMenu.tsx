"use client";

import { createClient } from "@/utils/supabase/client";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";

export const UserMenu = () => {

    const supabaseConnection = createClient();
    const router = useRouter();

    const logoutAction = async () => {
        const { error } = await supabaseConnection.auth.signOut();
        if (!error) {
            router.replace("/login");
        }
    }

    return (
        <MenuRoot>
            <MenuTrigger><GiHamburgerMenu /></MenuTrigger>
            <MenuContent>
                <MenuItem value="Log Out" onClick={logoutAction}>Log Out</MenuItem>
            </MenuContent>
        </MenuRoot>
    )

}

export default UserMenu;