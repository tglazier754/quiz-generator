"use client";

import QuizCard from "./quizCard";
import "./quiz.scss";
import { QuizQuestion } from "@/types/resourceTypes";

type QuizProps = {
    questions: QuizQuestion[];
}

export const Quiz = (props: QuizProps) => {

    const { questions } = props;

    return (
        <div className="quiz-container">
            <div className="quiz-card-container">
                {questions.map((question: QuizQuestion, index) =>
                    <QuizCard key={`quiz-card-${question.resource_id}-${index}`} question={question} />
                )}
            </div>
        </div>
    )
}

export default Quiz;