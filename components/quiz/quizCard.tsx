"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { Card, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useMemo } from "react";

type QuizCardProps = {
    question: QuizQuestion;
    changeHandler: (updatedQuestion: QuizQuestion) => void;
}

export const QuizCard = (props: QuizCardProps) => {
    const { question } = props;

    const sortedQuestionOptions = useMemo(() => {
        return question.quiz_question_options && question.quiz_question_options.sort((a, b) => { return a.order - b.order });
    }, [question.quiz_question_options]);


    return (
        <Card.Root>
            <Card.Body>
                <Card.Title >



                </Card.Title>
                <Text>{question.order}</Text>
                <Text>{question.expected_duration} minutes</Text>
                <Text>{question.type}</Text>
                <Text>{question.question}</Text>
                <Text>{question.answer}</Text>
                <Text>{question.quiz_question_options && question.quiz_question_options.length ? "Options" : ""}</Text>

                {sortedQuestionOptions && sortedQuestionOptions.map((option) => { return <Text>{option.value}</Text> })}


            </Card.Body>
            <Card.Footer>
                <Button>Update</Button>
                <Button>Delete</Button>
            </Card.Footer>

        </Card.Root>
    )
}

export default QuizCard;