"use client";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { createClient } from "@/utils/supabase/client";

export const UserMenu = () => {

    const supabaseConnection = createClient();

    const logoutAction = () => {
        supabaseConnection.auth.signOut();
    }

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
            />
            <MenuList>
                <MenuItem onClick={logoutAction}>
                    Log Out
                </MenuItem>
            </MenuList>
        </Menu>
    )

}

export default UserMenu;