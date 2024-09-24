"use client";

import QuizCard from "./quizCard";

export const Quiz = (props: { quizData: { questions: [], answers: [] } }) => {

    const { questions, answers } = props.quizData;

    return (
        <div>
            {questions.map((question: string, index: number) => <QuizCard question={question} answer={answers[index]} />)}
        </div>
    )
}

export default Quiz;