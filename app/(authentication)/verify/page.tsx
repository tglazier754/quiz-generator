import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";


export default function Verify() {

    //TODO: Add a check to see if this account previously existed or not and change the message accordingly

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
                <Box colorPalette={"grey"} >

                    <Stack
                        flexDir="column"
                        gap={4}
                        p="1rem"
                    >
                        <Text>A verification link has been sent to the provided email.</Text>
                        <Text>If this account already exists, please {" "}
                            <Link color="gray.500" href="/login">
                                log in.
                            </Link>
                        </Text>
                    </Stack>

                </Box>
            </Stack>
        </Flex>
    )

}