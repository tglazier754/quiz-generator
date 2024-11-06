"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { Card, Editable, EditableValueChangeDetails } from "@chakra-ui/react";
import { useState } from "react";

type QuizCardProps = {
    question: QuizQuestion;
    changeHandler: (updatedQuestion: QuizQuestion) => void;
}

export const QuizCard = (props: QuizCardProps) => {
    const { question, changeHandler } = props;

    const [questionText, setQuestionText] = useState(question.question);
    const [answerText, setAnswerText] = useState(question.answer);

    const handleQuestionTextChange = (e: EditableValueChangeDetails) => {
        setQuestionText(e.value);
        changeHandler({ ...question, question: e.value, answer: answerText });
    }
    const handleAnswerTextChange = (e: EditableValueChangeDetails) => {
        setAnswerText(e.value);
        changeHandler({ ...question, question: questionText, answer: e.value });
    }

    return (
        <Card.Root>
            <Card.Body>
                <Card.Title >
                    <Editable.Root
                        selectOnFocus={false}
                        value={questionText}
                        onValueChange={handleQuestionTextChange}>
                        <Editable.Preview />
                        <Editable.Textarea />
                    </Editable.Root>
                </Card.Title>
                <Card.Description  >
                    <Editable.Root
                        selectOnFocus={false}
                        value={answerText}
                        onValueChange={handleAnswerTextChange}>
                        <Editable.Preview />
                        <Editable.Textarea />
                    </Editable.Root>
                </Card.Description>

            </Card.Body>

        </Card.Root>
    )
}

export default QuizCard;