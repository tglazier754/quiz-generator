import Quiz from "../components/quiz/quiz";
import { generateQuizData } from "./functions";

type PageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const page = async (props: PageProps) => {
    const { params, searchParams } = props;

    //TODO: make this type safe
    const quizValue = await generateQuizData(searchParams && searchParams["url"]);

    console.log(searchParams);
    console.log(quizValue);


    return <div className="parent-container">
        {quizValue ? <Quiz quizData={quizValue} /> : <p>No quiz data</p>}
    </div>
}


export default page;