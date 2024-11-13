import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";


export default function Verify() {

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

                    <Stack
                        flexDir="column"
                        gap={4}
                        p="1rem"
                    >
                        <Text>A verification link has been sent to the provided email.</Text>
                        <Text>Please close this page and follow the link.</Text>
                    </Stack>

                </Box>
            </Stack>
        </Flex>
    )

}