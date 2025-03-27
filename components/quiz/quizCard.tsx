"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { BsClock } from "react-icons/bs";
import { IHash } from "@/types/globalTypes";
import { EditableTextField } from "./EditableTextField";
import { useQuizQuestion } from "./useQuizQuestion";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { DraggableAnswer } from "./DraggableAnswer";
import { Button } from "../ui/button";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trash } from "lucide-react";

type QuizCardProps = {
    question: QuizQuestion;
}

const questionTypeLabels: IHash<string> = {
    true_false: "True/False",
    multiple_choice: "Multiple Choice",
    long_form: "Long Form",
    short_answer: "Short Answer"
}

export const QuizCard = (props: QuizCardProps) => {
    const { question } = props;

    const { question: quizQuestion,
        answer,
        options,
        updateQuestion,
        updateAnswer,
        updateOption,
        reorderOptions,
        addOption,
        removeOption,
        toggleCorrectOption } = useQuizQuestion(question);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        if (sourceIndex !== destinationIndex) {
            reorderOptions(sourceIndex, destinationIndex);
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">


                    <div className="flex flex-col justify-between pb-4" >
                        <div className="flex gap-2.5">
                            <CardTitle className="text-base font-medium mt-2">{questionTypeLabels[question.type]}</CardTitle>
                        </div>
                        <span><BsClock className="inline" /> {question.expected_duration} min</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>

                <div>

                    <div className="flex flex-col gap-2.5">
                        <EditableTextField initialText={quizQuestion} onSave={(text) => updateQuestion(text)} />
                        {
                            question.type !== "multiple_choice" ? <EditableTextField initialText={answer} onSave={(text) => updateAnswer(text)} /> : null
                        }

                    </div>
                </div>
                {
                    question.type === "multiple_choice" ?
                        <div>
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
                        </div>
                        : null
                }


            </CardContent>

        </Card >
    )
}

export default QuizCard;