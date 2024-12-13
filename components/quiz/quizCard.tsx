"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { Box, Card, Flex, Stack, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { BsClock } from "react-icons/bs";
import { IHash } from "@/types/globalTypes";

type QuizCardProps = {
    question: QuizQuestion;
    changeHandler: (updatedQuestion: QuizQuestion) => void;
}

const questionTypeLabels: IHash<string> = {
    true_false: "True/False",
    multiple_choice: "Multiple Choice",
    long_form: "Long Form",
    short_answer: "Short Answer"
}

export const QuizCard = (props: QuizCardProps) => {
    const { question } = props;
    const [isEditing, setIsEditing] = useState(false);

    const sortedQuestionOptions = useMemo(() => {
        return question.quiz_question_options && question.quiz_question_options.sort((a, b) => { return a.order - b.order });
    }, [question.quiz_question_options]);


    return (
        <Card.Root>
            <Card.Body>
                <Stack direction="row" justifyContent="space-between" pb={4}>
                    <Flex gap={4}>
                        <Text>{question.order}</Text>
                        <Text>{questionTypeLabels[question.type]}</Text>
                    </Flex>
                    <Text><BsClock className="inline" /> {question.expected_duration} min</Text>
                </Stack>
                <Box>

                    <Stack gap={4}>
                        <Text>{question.question}</Text>
                        <Text>{question.answer}</Text>
                    </Stack>
                </Box>


                {sortedQuestionOptions && sortedQuestionOptions.map((option) => { return <Text key={`quiz-question-option-${option.id}`}>{option.value}</Text> })}


            </Card.Body>
            <Card.Footer>

                <Button>Edit</Button>
                <Button variant="outline">Delete</Button>

            </Card.Footer>

        </Card.Root>
    )
}

export default QuizCard;