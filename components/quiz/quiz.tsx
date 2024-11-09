"use client";

import QuizCard from "./quizCard";
import "./quiz.scss";
import { QuizQuestion } from "@/types/resourceTypes";

type QuizProps = {
    questions: QuizQuestion[];
    questionUpdateHandler: (updatedQuestion: QuizQuestion) => void;
}

export const Quiz = (props: QuizProps) => {

    const { questions, questionUpdateHandler } = props;


    const handleChange = (updatedQuestion: QuizQuestion) => {
        questionUpdateHandler(updatedQuestion);
    }


    return (
        <div className="quiz-container">
            <div className="quiz-card-container">
                {questions.map((question: QuizQuestion, index) =>
                    <QuizCard key={`quiz-card-${question.resource_id}-${index}`} question={question} changeHandler={handleChange} />
                )}
            </div>
        </div>
    )
}

export default Quiz;