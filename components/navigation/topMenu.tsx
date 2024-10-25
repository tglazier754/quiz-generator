import { createClient } from "@/utils/supabase/server";
import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Square } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import UserMenu from "./userMenu";

export const TopMenu = async () => {

    const supabaseConnection = createClient();
    const { data: userData, error: userError } = await supabaseConnection.auth.getUser();

    console.log(userData);

    const logoutAction = () => {
        console.log("logout");
    }

    return (
        <div className="w-screen top-0 h-10 bg-white">

            <Flex>
                <Square bg="red">
                    TG
                </Square>
                <Spacer />
                <UserMenu />
            </Flex>
        </div>
    )
};

export default TopMenu;