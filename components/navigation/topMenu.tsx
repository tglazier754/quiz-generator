import { Box, Flex, Spacer } from "@chakra-ui/react";
import UserMenu from "./userMenu";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar } from "../ui/avatar";

export const TopMenu = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return redirect("/login");
    const { user } = data;

    return (
        <Box zIndex="9999">

            < Flex p={4} pr={9} pl={9} margin="auto" alignItems="center" justifyContent="space-between" >
                <Avatar name="Quiz Generator!" color="white" backgroundColor="red" />
                <Spacer />
                <div className="h-full">
                    <UserMenu user={user} />
                </div>
            </Flex >
        </Box >

    )
};

export default TopMenu;


/*

        */