"use client"
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { createClient } from "@/utils/supabase/client";
import { Box, Button, Fieldset, Flex, Heading, Input, Separator, Stack, StackSeparator, Text } from "@chakra-ui/react";

export default function Login() {

    async function handleSignInWithGoogle() {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: '',
                    prompt: 'consent',
                },
                redirectTo: 'http://localhost:3000/api/auth/callback'
            },
        })
    }
    //redirectTo: 'http://quiz-generator-beta.vercel.app/api/auth/callback'

    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100wh"
            height="100vh">
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center">
                <Heading> Quiz Generator </Heading>
                <Box colorPalette={"grey"} backgroundColor="gray.900">
                    <form>
                        <Stack
                            flexDir="column"
                            gap={4}
                            p="1rem"
                        >
                            <Fieldset.Root size="lg" invalid>
                                <Stack>
                                    <Fieldset.Legend>Log In</Fieldset.Legend>
                                    <Fieldset.HelperText>
                                        Enter your email and password to login
                                    </Fieldset.HelperText>
                                </Stack>
                                <Fieldset.Content>
                                    <Field label="email">
                                        <Input type="email" />
                                    </Field>
                                    <Field label="password" invalid>
                                        <PasswordInput />
                                    </Field>
                                </Fieldset.Content>
                                <Fieldset.ErrorText>
                                    Wrong email or password.
                                </Fieldset.ErrorText>
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    width="full"
                                >
                                    Login
                                </Button>
                            </Fieldset.Root>
                            <Separator />
                            <Button variant="outline" onClick={handleSignInWithGoogle}>Authenticate with Google</Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>

        </Flex>
    );
}