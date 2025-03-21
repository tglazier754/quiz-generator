import { Draggable } from 'react-beautiful-dnd'
import { EditableTextField } from './EditableTextField'
import { BiCheck, BiTrash } from 'react-icons/bi';
import { QuizQuestionOption } from '@/types/resourceTypes';
import { RiDraggable } from 'react-icons/ri';
import { Button } from '../ui/button';

interface DraggableAnswerProps {
    answer: QuizQuestionOption
    index: number
    isCorrect: boolean;
    updateAnswer: (id: string, text: string) => void
    removeAnswer: (id: string) => void
    toggleCorrectAnswer: (id: string) => void
}

export function DraggableAnswer({
    answer,
    index,
    isCorrect,
    updateAnswer,
    removeAnswer,
    toggleCorrectAnswer
}: DraggableAnswerProps) {
    return (
        <Draggable draggableId={answer.id!} index={index}>
            {(provided, snapshot) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center gap-2 bg-white p-2 rounded-md shadow-sm transition-shadow ${snapshot.isDragging ? 'shadow-lg ring-2 ring-primary' : ''
                        }`}
                    style={{
                        ...provided.draggableProps.style,
                        zIndex: snapshot.isDragging ? 1000 : 'auto'
                    }}
                >
                    <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                        <RiDraggable className="h-5 w-5 text-gray-400" />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => toggleCorrectAnswer(answer.id!)}
                        className={isCorrect ? 'bg-green-100' : ''}
                    >
                        <BiCheck className={`h-4 w-4 ${isCorrect ? 'opacity-100' : 'opacity-0'}`} />
                    </Button>
                    <EditableTextField
                        initialText={answer.value}
                        onSave={(text) => updateAnswer(answer.id!, text)}
                        className="flex-grow"
                    />
                    <Button
                        variant="outline"
                        onClick={() => removeAnswer(answer.id!)}
                    >
                        <BiTrash className="h-4 w-4" />
                    </Button>
                </li>
            )}
        </Draggable>
    )
}

