"use client";

import QuizCard from "./quizCard";
import "./quiz.scss";

export const Quiz = (props: { quizData: { questions: string[], answers: string[] } }) => {

    const { questions, answers } = props.quizData;

    return (
        <div className="quiz-container">
            <div className="quiz-card-container">
                {questions.map((question: string, index: number) => <QuizCard key={"quiz-card-" + index} index={index + 1} question={question} answer={answers[index]} />)}
            </div>
        </div>
    )
}

export default Quiz;