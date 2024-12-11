"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { Card, Text } from "@chakra-ui/react";
import { useEffect } from "react";

type QuizCardProps = {
    question: QuizQuestion;
    changeHandler: (updatedQuestion: QuizQuestion) => void;
}

export const QuizCard = (props: QuizCardProps) => {
    const { question } = props;
    useEffect(() => { console.log(question); }, []);

    return (
        <Card.Root>
            <Card.Body>
                <Card.Title >



                </Card.Title>
                <Text>{question.type}</Text>
                <Text>{question.question}</Text>
                <Text>{question.answer}</Text>
                <Text>Options</Text>

                {question.quiz_question_options && question.quiz_question_options.map((option) => { return <Text>{option.value}</Text> })}


            </Card.Body>

        </Card.Root>
    )
}

export default QuizCard;