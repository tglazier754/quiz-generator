"use client"
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useUserAuthentication } from "@/hooks/useUserAuthentication";
import { Box, Button, Fieldset, Flex, Heading, Input, Link, Separator, Stack } from "@chakra-ui/react";
import { createRef } from "react";

export default function Login() {

    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const { signInWithEmail, signInWithGoogle, error, errorMessage } = useUserAuthentication(emailRef, passwordRef);

    const handleLoginButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await signInWithEmail();
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
                <Heading size="3xl"> Quiz Generator </Heading>
                <Box colorPalette={"grey"} backgroundColor="gray.900">
                    <form>
                        <Stack
                            flexDir="column"
                            gap={4}
                            p="1rem"
                        >
                            <Fieldset.Root size="lg" invalid={error}>
                                <Stack>
                                    <Fieldset.Legend>Log In</Fieldset.Legend>
                                    <Fieldset.HelperText>
                                        Enter your email and password to log in
                                    </Fieldset.HelperText>
                                </Stack>
                                <Fieldset.Content>
                                    <Field label="email">
                                        <Input ref={emailRef} type="email" />
                                    </Field>
                                    <Field label="password">
                                        <PasswordInput ref={passwordRef} />
                                    </Field>
                                </Fieldset.Content>
                                <Fieldset.ErrorText>
                                    {errorMessage}
                                </Fieldset.ErrorText>
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    width="full"
                                    onClick={handleLoginButton}
                                >
                                    Log in
                                </Button>
                            </Fieldset.Root>
                            <Separator />
                            <Button variant="outline" onClick={signInWithGoogle}>Authenticate with Google</Button>
                        </Stack>
                    </form>
                </Box>
                <Box>
                    Not a member?{" "}
                    <Link color="gray.500" href="/signup">
                        Sign Up
                    </Link>
                </Box>
            </Stack>

        </Flex >
    );
}