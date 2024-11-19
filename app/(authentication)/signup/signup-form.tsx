"use client"
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useUserAuthentication } from "@/hooks/useUserAuthentication";
import { Box, Button, Fieldset, Heading, Input, Link, Stack } from "@chakra-ui/react";

export default function SignUpForm() {

    const { signUpWithEmail, error, errorMessage, emailRef, passwordRef } = useUserAuthentication();

    const handleSignupButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await signUpWithEmail();
    }

    return (
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
                                <Fieldset.Legend>Sign Up</Fieldset.Legend>
                                <Fieldset.HelperText>
                                    Enter your email and password to get started
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
                                onClick={handleSignupButton}
                            >
                                Sign Up
                            </Button>
                        </Fieldset.Root>
                    </Stack>
                </form>
            </Box>
            <Box>
                Already a member?{" "}
                <Link color="gray.500" href="/login">
                    Log In
                </Link>
            </Box>
        </Stack>
    );
}