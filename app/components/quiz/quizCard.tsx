"use client";

import { Button, Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const QuizCard = (props: { index: number, question: string, answer: string }) => {
    const { index, question, answer } = props;

    const [showAnswer, setShowAnswer] = useState(false);
    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    }

    return (
        <Card className="quiz-card">
            <CardHeader>
                <Heading size="md">Question {index}</Heading>
            </CardHeader>
            <CardBody>
                <Stack>
                    <div className="question">
                        <p>{question}</p>
                    </div>

                    <div className="answer-container">
                        <Button onClick={toggleShowAnswer}>{showAnswer ? "Hide" : "Show"}</Button>
                        {showAnswer ? <p >{answer}</p> : null}
                    </div>
                </Stack>
            </CardBody>

        </Card>
    )
}

export default QuizCard;