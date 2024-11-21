import { Box, Circle, Flex, Spacer } from "@chakra-ui/react";
import UserMenu from "./userMenu";

export const TopMenu = async () => {


    return (
        <Box className="w-screen p-0 " position="fixed" top="0" height="12" zIndex="9999" backgroundColor="black">

            <Flex alignItems="center" className="min-h-12 pr-4 pl-4">
                <Circle bg="red" color="white">
                    TG
                </Circle>
                <Spacer />
                <div className="h-full">
                    <UserMenu />
                </div>
            </Flex>
        </Box>
    )
};

export default TopMenu;