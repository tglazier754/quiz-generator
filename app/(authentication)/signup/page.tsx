import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useUserAuthentication } from "@/hooks/useUserAuthentication";
import { Box, Button, Fieldset, Flex, Heading, Input, Link, Separator, Stack } from "@chakra-ui/react";
import { createRef } from "react";
import SignupWrapper from "./signup-wrapper";
import { createClient } from "@/utils/supabase/server";
import { TABLE_USERS } from "@/types/constants";
import { redirect } from "next/navigation";

export default async function SignUp() {

    let screen = 1;

    const supabase = createClient();

    //check for user data
    const { data, error } = await supabase.auth.getUser();
    const { user } = data;

    console.log(data);
    console.log(user);
    if (user) {
        //pull the user's info from the db

        const { data: profile, error: profileError } = await supabase.from(TABLE_USERS).select().eq("id", data.user.id);
        const currentProfile = profile && profile[0];

        if (currentProfile && currentProfile.complete) {
            //there is an existing user record for this user and their profile is complete
            return redirect("/library");
        }
        if ((currentProfile && !currentProfile.complete) || !currentProfile) {
            screen = 2;
        }
        else {
            //there was some sort of error
        }

    }

    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100wh"
            height="100vh">
            <SignupWrapper screen={screen} />
        </Flex >
    );
}