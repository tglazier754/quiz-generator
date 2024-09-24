import Quiz from "../components/quiz";
import { generateQuizData } from "./functions";

type PageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const page = async (props: PageProps) => {
    const { params, searchParams } = props;

    const quizValue = await generateQuizData(searchParams && searchParams["url"]);

    console.log(searchParams);
    console.log(quizValue);


    return <div><Quiz quizData={quizValue} /></div>
}


export default page;