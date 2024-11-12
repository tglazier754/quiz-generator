"use client"
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useUserAuthentication } from "@/hooks/useUserAuthentication";
import { Box, Button, Fieldset, Flex, Heading, Input, Separator, Stack } from "@chakra-ui/react";
import { createRef } from "react";

export default function Login() {

    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const { signIn } = useUserAuthentication(emailRef, passwordRef);
    //TODO: Make the email/password flow
    const signInWithEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        signIn("EMAIL");
    }
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
                                        <Input ref={emailRef} type="email" />
                                    </Field>
                                    <Field label="password" invalid>
                                        <PasswordInput ref={passwordRef} />
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
                                    onClick={signInWithEmail}
                                >
                                    Login
                                </Button>
                            </Fieldset.Root>
                            <Separator />
                            <Button variant="outline" onClick={() => signIn("GOOGLE")}>Authenticate with Google</Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>

        </Flex >
    );
}