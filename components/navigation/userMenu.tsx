"use client"

import { createClient } from "@/utils/supabase/client";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Avatar } from "../ui/avatar";
import { IconButton } from "@chakra-ui/react";

type UserMenuProps = {
    user: User;
}

export const UserMenu = (props: UserMenuProps) => {

    const { user } = props;
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
            <MenuTrigger asChild><IconButton rounded="full"><Avatar name={user.email} /></IconButton></MenuTrigger>
            <MenuContent>
                <MenuItem value="Log Out" onClick={logoutAction}>Log Out</MenuItem>
            </MenuContent>
        </MenuRoot>
    )

}

export default UserMenu;