"use client";

import QuizCard from "./quizCard";
import "./quiz.scss";
import { QuizQuestion } from "@/types/resourceTypes";
import { IHash } from "@/types/globalTypes";

type QuizProps = {
    questions: QuizQuestion[];
}

export const Quiz = (props: QuizProps) => {

    const { questions } = props;

    const changes: IHash<QuizQuestion> = {};

    const handleChange = (updatedQuestion: QuizQuestion) => {
        //TODO: remove the item from the changes list if there is no delta
        if (updatedQuestion && updatedQuestion.id) {
            changes[updatedQuestion.id] = updatedQuestion;
        }
        console.log(changes);
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