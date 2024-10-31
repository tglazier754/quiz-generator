"use client";

import { createClient } from "@/utils/supabase/client";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { GiHamburgerMenu } from "react-icons/gi";

export const UserMenu = () => {

    const supabaseConnection = createClient();

    const logoutAction = () => {
        supabaseConnection.auth.signOut();
    }

    return (
        <MenuRoot>
            <MenuTrigger><GiHamburgerMenu /></MenuTrigger>
            <MenuContent>
                <MenuItem value="Log Out" onClick={logoutAction} />
            </MenuContent>
        </MenuRoot>
    )

}

export default UserMenu;