"use client";

import QuizCard from "./quizCard";
import { QuizQuestion } from "@/types/resourceTypes";
import { useMemo } from "react";

type QuizProps = {
    questions: QuizQuestion[];
}

export const Quiz = (props: QuizProps) => {

    const { questions } = props;


    const sortedQuestions = useMemo(() => {
        return questions.sort((a, b) => { return a.order - b.order });
    }, [questions]);


    return (
        <div className="flex flex-col gap-2 p-2.5 overflow-y-scroll"
        >
            {sortedQuestions.map((question: QuizQuestion, index) =>
                <QuizCard key={`quiz-card-${question.resource_id}-${index}`} question={question} />
            )}
        </div>
    )
}

export default Quiz;