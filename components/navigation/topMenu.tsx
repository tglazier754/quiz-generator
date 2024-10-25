import { createClient } from "@/utils/supabase/server";
import { Circle, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Square } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import UserMenu from "./userMenu";

export const TopMenu = async () => {

    const supabaseConnection = createClient();
    const { data: userData, error: userError } = await supabaseConnection.auth.getUser();

    return (
        <div className="w-screen top-0 h-12 p-0 bg-white">

            <Flex alignItems="center" className="min-h-12 pr-4 pl-4">
                <Circle bg="red" color="white">
                    TG
                </Circle>
                <Spacer />
                <div className="h-full">
                    <UserMenu />
                </div>
            </Flex>
        </div>
    )
};

export default TopMenu;