import { Card, CardBody, CardHeader, Stack } from "@chakra-ui/react";
import Quiz from "../components/quiz/quiz";
import { generateQuizData } from "./functions";

type PageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const page = async (props: PageProps) => {
    const { params, searchParams } = props;

    //TODO: make this type safe
    const digestedWebsiteData = await generateQuizData(searchParams && searchParams["url"]);

    const { summary, quiz } = { ...digestedWebsiteData };

    console.log(summary);
    console.log(quiz);


    return <div className="parent-container">
        <Stack>
            {summary ?
                <Card>
                    <CardHeader>Summary</CardHeader>
                    <CardBody>{summary}</CardBody>
                </Card>
                : <p>No summary data</p>}
            {quiz ?
                <Quiz quizData={quiz} />
                : <p>No quiz data</p>}
        </Stack>
    </div>
}


export default page;