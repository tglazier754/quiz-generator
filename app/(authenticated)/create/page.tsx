import { Box, Flex, Heading, } from "@chakra-ui/react"
import ParameterForm from "@/components/create/ParameterForm";
import ContentInputPanel from "@/components/create/ContentInputPanel";
import ContentCreationContextProvider from "@/context/create/provider";

const page = async () => {
    return (
        <ContentCreationContextProvider>
            <Flex
                direction="column"
                maxHeight="100%"
                height="100%"
                minHeight="0"
                maxWidth="100%"
                width="100%"
                p="4"
            >
                <Box className="flex-grow-0 pb-4">
                    <Heading fontSize="2xl">Create</Heading>
                </Box>
                <Flex
                    justifyContent="center"
                    className="flex-grow"
                    direction="row"
                    maxHeight="100%"
                    minHeight="0"
                    height="100%"
                    maxWidth="100%"
                    width="100%"
                    gap={2}>
                    <Box className=" w-2/3 z-10 flex-grow-0 border-solid ">
                        <ParameterForm />
                    </Box>
                    <Box className="p-4 m-auto w-1/3 h-full  border-solid " overflowY="auto">
                        <ContentInputPanel />
                    </Box>
                </Flex>
            </Flex>
        </ContentCreationContextProvider >
    )
}

export default page;