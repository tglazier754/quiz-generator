"use client"
import { Field } from "@/components/ui/field";
import { useUserProfileForm } from "@/hooks/useUserProfileForm";
import { Box, Button, Fieldset, Heading, Input, Stack } from "@chakra-ui/react";
import { createRef } from "react";

export default function ProfileForm() {

    const firstNameRef = createRef<HTMLInputElement>();
    const lastNameRef = createRef<HTMLInputElement>();
    const roleRef = createRef<HTMLInputElement>();
    const subjectRef = createRef<HTMLInputElement>();

    const { submitProfileData, error, errorMessage } = useUserProfileForm(firstNameRef, lastNameRef, roleRef, subjectRef);

    const handleSubmitButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await submitProfileData();
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
                                <Fieldset.Legend>Profile</Fieldset.Legend>
                                <Fieldset.HelperText>
                                    Before getting started, let&#39;s get to know you.
                                </Fieldset.HelperText>
                            </Stack>
                            <Fieldset.Content>
                                <Field label="first name">
                                    <Input ref={firstNameRef} type="email" />
                                </Field>
                                <Field label="last name">
                                    <Input ref={lastNameRef} />
                                </Field>
                                <Field label="role">
                                    <Input ref={roleRef} />
                                </Field>
                                <Field label="subject">
                                    <Input ref={subjectRef} />
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
                                onClick={handleSubmitButton}
                            >
                                Continue
                            </Button>
                        </Fieldset.Root>
                    </Stack>
                </form>
            </Box>
        </Stack>
    );
}