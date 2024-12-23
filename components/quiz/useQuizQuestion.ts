import { QuizQuestion, QuizQuestionOption } from '@/types/resourceTypes'
import { useState } from 'react'


export function useQuizQuestion(initialQuestion: QuizQuestion) {
  const [question, setQuestion] = useState(initialQuestion.question)
  const [answer, setAnswer] = useState(initialQuestion.answer);

  const sortedOptions =  initialQuestion.quiz_question_options && initialQuestion.quiz_question_options.sort((a, b) => { return a.order - b.order });

  const [options, setOptions] = useState(sortedOptions || []);

  const resetValues = (resetQuestion: QuizQuestion) => {
    setQuestion (resetQuestion.question);
    setAnswer (resetQuestion.answer);
    console.log (resetQuestion.quiz_question_options);
    const sortedOptions =  resetQuestion.quiz_question_options && resetQuestion.quiz_question_options.sort((a, b) => { return a.order - b.order });
    setOptions (sortedOptions || []);
  }

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

  const addOption = (newOption:QuizQuestionOption) => {
    console.log (newOption);
    setOptions([...options, newOption])
  }

  const removeOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id))
  }

  const toggleCorrectOption = (id: string) => {
    setOptions(options.map(option => 
    {
      if (option.id === id) {
        setAnswer(option.value);
        return { ...option, is_correct: true };
      }
      else {
        return { ...option, is_correct: false };
      }

    }
    ))
  }

  const reorderOptions = (startIndex:number, endIndex:number) => {
    setOptions(prevOptions => {
      const result = Array.from(prevOptions);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map ((option, index) => {return {...option, order:index}});
    });
  }

  return {
    question,
    answer,
    options,
    resetValues,
    updateQuestion,
    updateAnswer,
    updateOption,
    addOption,
    removeOption,
    toggleCorrectOption,
    reorderOptions
  }
}

