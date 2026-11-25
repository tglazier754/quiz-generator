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
import { CheckCircleIcon, Pen, Trash, X } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type QuizCardProps = {
    question: QuizQuestion;
    updateQuestion: () => void;
}

const questionTypeLabels: IHash<string> = {
    true_false: "True/False",
    multiple_choice: "Multiple Choice",
    long_form: "Long Form",
    short_answer: "Short Answer"
}

export const QuizCard = (props: QuizCardProps) => {
    const { question } = props;

    const {
        options,
        updateOption,
        reorderOptions,
        addOption,
        removeOption,
        toggleCorrectOption } = useQuizQuestion(question);

    const [isEditing, setIsEditing] = useState(false);
    const [answerVal, setAnswerVal] = useState(question.answer);
    const [questionVal, setQuestionVal] = useState(question.question);

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

    const handleEditCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setAnswerVal(question.answer);
        setQuestionVal(question.question);
        setIsEditing(false);
    }
    const handleEditSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    if (isEditing) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">


                        <div className="flex flex-col justify-between pb-4" >
                            <div className="flex gap-2.5">
                                <CardTitle className="text-base font-medium mt-2">{questionTypeLabels[question.type]}</CardTitle>
                            </div>
                            <span><BsClock className="inline" /> {question.expected_duration ? `${question.expected_duration} min` : "unknown"}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={handleEditSave}>
                                <CheckCircleIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleEditCancel}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>

                    <div>

                        <div className="flex flex-col gap-2.5">

                            <Input type="text" value={questionVal} onChange={(e) => { setQuestionVal(e.currentTarget.value) }} />

                            {question.type !== "multiple_choice" ?
                                <Textarea value={answerVal} onChange={(e) => { setAnswerVal(e.currentTarget.value) }} />
                                : null}

                        </div>
                    </div>
                    {
                        question.type === "multiple_choice" ?
                            <div className="mb-6 mt-6 flex gap-6 flex-col">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <StrictModeDroppable droppableId="answers">
                                        {(provided, snapshot) => (
                                            <ul
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`space-y-4 transition-colors ${snapshot.isDraggingOver ? 'bg-gray-50 rounded-md p-4' : ''
                                                    }`}
                                            >
                                                {options && options.map((option, index) => { return <DraggableAnswer key={option.id} answer={option} index={index} updateAnswer={updateOption} removeAnswer={removeOption} toggleCorrectAnswer={toggleCorrectOption} isCorrect={answerVal === option.value} /> })}

                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </StrictModeDroppable>
                                </DragDropContext>

                                <div>
                                    <Button size="sm" onClick={addOption}>Add Option</Button>
                                </div>
                            </div>
                            : null
                    }


                </CardContent>

            </Card>

        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">


                    <div className="flex flex-col justify-between pb-4" >
                        <div className="flex gap-2.5">
                            <CardTitle className="text-base font-medium mt-2">{questionTypeLabels[question.type]}</CardTitle>
                        </div>
                        <span><BsClock className="inline" /> {question.expected_duration ? `${question.expected_duration} min` : "unknown"}</span>
                    </div>
                    <div className="flex gap-2">

                        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                            <Pen className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                        </Button>


                    </div>
                </div>
            </CardHeader>
            <CardContent>

                <div>

                    <div className="flex flex-col gap-2.5">
                        <span>{questionVal}</span>

                        {question.type !== "multiple_choice" ?

                            <span>{answerVal}</span>
                            : null}

                    </div>
                </div>
                {
                    question.type === "multiple_choice" ?
                        <div>

                            <ul>
                                {options && options.map((option, index) => {
                                    return (
                                        <li key={option.id}>
                                            <span>{`${index + 1}. `}</span>
                                            <span>{option.value}</span>
                                        </li>
                                    )
                                })}

                            </ul>

                        </div>
                        : null
                }


            </CardContent>

        </Card >
    )
}

export default QuizCard;