"use client";

import { QuizQuestion } from "@/types/resourceTypes";
import { BsClock } from "react-icons/bs";
import { IHash } from "@/types/globalTypes";
import { EditableTextField } from "./EditableTextField";
import { useQuizQuestion } from "./useQuizQuestion";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { DraggableAnswer } from "./DraggableAnswer";
import { BiX } from "react-icons/bi";
import { Button } from "../ui/button";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Card, CardContent, CardHeader } from "../ui/card";

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
                <Button className="absolute top-2 right-2" variant="ghost" ><div><BiX /></div></Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-between pb-8" >
                    <div className="flex gap-2.5">
                        <span>{question.order}</span>
                        <span>{questionTypeLabels[question.type]}</span>
                    </div>
                    <span><BsClock className="inline" /> {question.expected_duration} min</span>
                </div>
                <div>

                    <div className="flex flex-row gap-2.5">
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