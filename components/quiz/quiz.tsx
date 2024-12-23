"use client";

import { Flex } from "@chakra-ui/react";
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
        <Flex
            direction="column"
            gap={5}
            p={4}
            overflowY="scroll"
        >
            {sortedQuestions.map((question: QuizQuestion, index) =>
                <QuizCard key={`quiz-card-${question.resource_id}-${index}`} question={question} />
            )}
        </Flex>
    )
}

export default Quiz;