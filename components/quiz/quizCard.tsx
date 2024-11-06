"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { Card } from "@chakra-ui/react";

type QuizCardProps = {
    question: QuizQuestion;
}

export const QuizCard = (props: QuizCardProps) => {
    const { question } = props;

    return (
        <Card.Root>
            <Card.Body>
                <Card.Title lineHeight="1.2rem">{question.question}</Card.Title>
                <Card.Description textOverflow="ellipsis" wordWrap="break-word" overflow="hidden" maxH="8em" lineHeight="1rem" >
                    {question.answer}
                </Card.Description>

            </Card.Body>

        </Card.Root>
    )
}

export default QuizCard;