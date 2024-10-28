import { Circle, Flex, Spacer } from "@chakra-ui/react";
import UserMenu from "./userMenu";

export const TopMenu = async () => {


    return (
        <div className="w-screen top-0 h-12 p-0 bg-white border-b border-solid">

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