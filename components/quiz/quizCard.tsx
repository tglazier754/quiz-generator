"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { Box, Card, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";
import { IHash } from "@/types/globalTypes";
import { EditableTextField } from "./EditableTextField";
import { useQuizQuestion } from "./useQuizQuestion";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { DraggableAnswer } from "./DraggableAnswer";
import { BiX } from "react-icons/bi";
import { Button } from "../ui/button";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useQuizQuestionUpdate } from "./useQuizQuestionUpdate";

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

    const { question: quizQuestion, answer, options, updateQuestion, updateAnswer, updateOption, reorderOptions, addOption, removeOption, toggleCorrectOption } = useQuizQuestion(question);
    const { uploadStatus, updateQuizQuestion } = useQuizQuestionUpdate();

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        console.log(sourceIndex);
        console.log(destinationIndex);

        if (sourceIndex !== destinationIndex) {
            reorderOptions(sourceIndex, destinationIndex);
        }
    }

    const submitQuizQuestionChanges = () => {
        updateQuizQuestion({ ...question, question: quizQuestion, answer, quiz_question_options: options });
    }


    //question an answer are separate
    //if multiple choice, answer is a drop down of options from quiz_question_options

    //quiz question should be drag and drop (to change the order field)
    //quiz_question_options is drag and drop (to change the order field)

    //if edit is selected, it can only be undone by submitting or cancelling
    //need a useEffect for edit mode to register/unregister


    return (
        <Card.Root>
            <Card.Header>
                <IconButton variant="ghost" size="xs" position="absolute" top={2} right={2}><Box><BiX /></Box></IconButton>
            </Card.Header>
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
                        <EditableTextField initialText={quizQuestion} onSave={(text) => updateQuestion(text)} />
                        {
                            question.type !== "multiple_choice" ? <EditableTextField initialText={answer} onSave={(text) => updateAnswer(text)} /> : null
                        }

                    </Stack>
                </Box>
                {
                    question.type === "multiple_choice" ?
                        <Box>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <StrictModeDroppable droppableId="answers">
                                    {(provided, snapshot) => (
                                        <ul
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`space-y-4 transition-colors ${snapshot.isDraggingOver ? 'bg-gray-50 rounded-md p-4' : ''
                                                }`}
                                        >
                                            {options && options.map((option, index) => { return <DraggableAnswer key={option.id} answer={option} index={index} updateAnswer={updateOption} removeAnswer={removeOption} toggleCorrectAnswer={toggleCorrectOption} isCorrect={answer === option.value} /> })}

                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </StrictModeDroppable>
                            </DragDropContext>

                            <Button size="sm" onClick={addOption}>Add Option</Button>
                        </Box>
                        : null
                }

                <Box><Button size="sm" mt={4} disabled={uploadStatus.status === "pending"} onClick={submitQuizQuestionChanges}>Submit Changes</Button></Box>

            </Card.Body>

        </Card.Root >
    )
}

export default QuizCard;