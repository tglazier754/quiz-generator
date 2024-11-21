import "../globals.css";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex className="max-w-full w-full h-full max-h-full p-4"
      alignItems="center"
      alignContent="center"
      justifyItems="center"
      justifyContent="center">
      <Center>
        <Box>
          <Spinner />
        </Box>
      </Center>
    </Flex>
  );
}
