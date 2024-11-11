
import { RESOURCE_TYPE_LESSON_PLAN, RESOURCE_TYPE_QUIZ, RESOURCE_TYPE_TEXT, RESOURCE_TYPE_WEBSITE } from "@/types/constants";
import { Box, Image, Text } from "@chakra-ui/react";
import { CgWebsite } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { MdQuiz } from "react-icons/md";


type ResourceCardImageProps = {
    src?: string | File | null;
    type?: string;
    name?: string;
}

export const ResourceCardImage = (props: ResourceCardImageProps) => {
    const { src, type, name } = props;
    //{resource.url ? <Image src={resource.url as string} alt={resource.name} /> : <></>}

    if (src) {
        return <Image src={src as string} alt={name} />
    }
    else {
        switch (type) {

            case RESOURCE_TYPE_TEXT:
                return <Box backgroundColor="red">
                    <IoText />
                </Box>
            case RESOURCE_TYPE_WEBSITE:
                return <Box backgroundColor="green">
                    <CgWebsite />
                </Box>
            case RESOURCE_TYPE_QUIZ:
                return <Box backgroundColor="pink">
                    <MdQuiz />
                </Box>
            case RESOURCE_TYPE_LESSON_PLAN:
                return <Box backgroundColor="blue">
                    <FaTasks />
                </Box>

        }
        return <Box>
            <Text>{type}</Text>
        </Box>
    }
}

export default ResourceCardImage;