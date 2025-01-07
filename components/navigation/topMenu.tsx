import { Box, Drawer, Flex, Group, HStack, Spacer } from "@chakra-ui/react";
import UserMenu from "./userMenu";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar } from "../ui/avatar";
import Link from "next/link";

export const TopMenu = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return redirect("/login");
    const { user } = data;

    return (
        <Box zIndex="9999">

            < Flex p={4} pr={9} pl={9} margin="auto" alignItems="center" justifyContent="space-between" >
                <HStack>
                    <Avatar name="Quiz Generator!" color="white" backgroundColor="red" />
                    <Spacer />
                    <Group>
                        <Link href="/library">Library</Link>
                        <Link href="/create">Create</Link>
                    </Group>
                </HStack>
                <div className="h-full">
                    <UserMenu user={user} />
                </div>
            </Flex >
        </Box >

    )
};

export default TopMenu;


import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { BiMenu, BiUser } from "react-icons/bi";

const navItems = [
    { name: "Library", href: "/library" },
    { name: "Create", href: "/create" },
]

export async function Navbar() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return redirect("/login");
    const { user } = data;

    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/library" className="text-2xl font-bold text-primary mr-10">
                            Quiz Generator
                        </Link>
                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <UserMenu user={user} />
                    </div>
                    <div className="md:hidden">
                        <DrawerRoot placement="end">
                            <DrawerBackdrop />
                            <DrawerTrigger asChild>
                                <Button variant="ghost" className="px-2">
                                    <span className="sr-only">Open menu</span>
                                    <BiMenu className="h-6 w-6" aria-hidden="true" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="w-[240px] sm:w-[300px]">
                                <div className="flex flex-col space-y-4 mt-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <UserMenu user={user} />
                                </div>
                            </DrawerContent>
                        </DrawerRoot>
                    </div>
                </div>
            </div>
        </nav>
    )
}