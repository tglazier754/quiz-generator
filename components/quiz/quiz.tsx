"use client";

import { Flex } from "@chakra-ui/react";
import QuizCard from "./quizCard";
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
        <Flex
            direction="column"
            gap={5}
            p={4}
            overflowY="scroll"
        >
            {questions.map((question: QuizQuestion, index) =>
                <QuizCard key={`quiz-card-${question.resource_id}-${index}`} question={question} changeHandler={handleChange} />
            )}
        </Flex>
    )
}

export default Quiz;