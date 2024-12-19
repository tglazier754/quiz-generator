import { QuizQuestion, QuizQuestionOption } from '@/types/resourceTypes'
import { useState } from 'react'


export function useQuizQuestion(initialQuestion: QuizQuestion) {
  const [question, setQuestion] = useState(initialQuestion.question)
  const [answer, setAnswer] = useState(initialQuestion.answer);
  const [options, setOptions] = useState(initialQuestion.quiz_question_options || []);

  const updateQuestion = (newQuestion: string) => {
    setQuestion(newQuestion)
  }

  const updateAnswer = (newAnswer: string) => {
    setAnswer(newAnswer);
  }

  const updateOption = (id: string, newText: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, value: newText } : option
    ))
  }

  const addOption = () => {
    const date = Date.now().toString();
    const newOption: QuizQuestionOption = {
      id: "temp" + date,
      created_at: date,
      value: 'New answer',
      order: options && options.length || 1,
      quiz_question_id: initialQuestion.id!,
    }
    setOptions([...options, newOption])
  }

  const removeOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id))
  }

  const toggleCorrectOption = (id: string) => {
    const selectedOption = options.find ((option) => {return option.id === id});
    if (selectedOption) setAnswer(selectedOption.value);
  }

  const reorderOptions = (startIndex:number, endIndex:number) => {
    console.log (startIndex);
    console.log (endIndex);
  }

  return {
    question,
    answer,
    options,
    updateQuestion,
    updateAnswer,
    updateOption,
    addOption,
    removeOption,
    toggleCorrectOption,
    reorderOptions
  }
}

