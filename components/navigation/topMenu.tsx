import * as React from "react"
import UserMenu from "./userMenu";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { BiMenu } from "react-icons/bi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

const navItems = [
    { name: "Library", href: "/library" },
    { name: "Create", href: "/create" },
]

export async function TopMenu() {
    const supabase = createClient();
    const { error } = await supabase.auth.getUser();
    if (error) return redirect("/login");

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
                        <UserMenu />
                    </div>
                    <div className="md:hidden">
                        <Drawer>
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
                                    <UserMenu />
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
        </nav>
    )
}


export default TopMenu;