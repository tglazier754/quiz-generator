"use client";

import { useState } from "react";

export const QuizCard = (props: { question: string, answer: string }) => {
    const { question, answer } = props;

    const [showAnswer, setShowAnswer] = useState(false);
    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    }

    return (
        <div className="quiz-card">
            <div className="question">
                <p>{question}</p>
            </div>

            <div className="answer-container">
                {showAnswer ? <p>{answer}</p> : null}
                <button onClick={toggleShowAnswer}>{showAnswer ? "Hide" : "Show"}</button>
            </div>


        </div>
    )
}

export default QuizCard;