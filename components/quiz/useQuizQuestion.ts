import { QuizQuestion, QuizQuestionOption } from '@/types/resourceTypes'
import { useEffect, useState } from 'react'
import { useQuizQuestionUpdate } from './useQuizQuestionUpdate';
import { useQuizQuestionOptionUpdate } from './useQuizQuestionOptionUpdate';


export function useQuizQuestion(initialQuestion: QuizQuestion) {
  const [question, setQuestion] = useState(initialQuestion.question)
  const [answer, setAnswer] = useState(initialQuestion.answer);

  const sortedOptions =  initialQuestion.quiz_question_options && initialQuestion.quiz_question_options.sort((a, b) => { return a.order - b.order });

  const { uploadStatus, resetUploadStatus, updateQuizQuestion } = useQuizQuestionUpdate();
  const { uploadStatus: optionUploadStatus, resetUploadStatus: resetOptionUploadStatus, removeQuizQuestionOption, uploadQuizQuestionOption } = useQuizQuestionOptionUpdate();

  const [options, setOptions] = useState(sortedOptions || []);


  const resetValues = (resetQuestion: QuizQuestion) => {
    setQuestion (resetQuestion.question);
    setAnswer (resetQuestion.answer);
    console.log (resetQuestion.quiz_question_options);
    const sortedOptions =  resetQuestion.quiz_question_options && resetQuestion.quiz_question_options.sort((a, b) => { return a.order - b.order });
    setOptions (sortedOptions || []);
  }



  useEffect(() => {
    if (uploadStatus.status !== "pending" && uploadStatus.status !== "uninitialized") {
        if (uploadStatus.status === "error") {
            //toast
        }
        resetUploadStatus();
    }
}, [uploadStatus, resetUploadStatus]);

useEffect(() => {
    if (optionUploadStatus.status !== "pending" && optionUploadStatus.status !== "uninitialized") {
        if (uploadStatus.status === "error") {
            //toast
        }
        resetOptionUploadStatus();
    }
}, [optionUploadStatus, resetOptionUploadStatus])

  const updateQuestion = async (newQuestion: string) => {
    const sendUpdatedQuestion = await updateQuizQuestion({id:initialQuestion.id, question:newQuestion });
    if (sendUpdatedQuestion.status === "success")
    {
      setQuestion(newQuestion);
    }
  }

  const updateAnswer = async (newAnswer: string) => {
    const sendUpdatedQuestion = await updateQuizQuestion({id:initialQuestion.id, answer:newAnswer });
    if (sendUpdatedQuestion.status === "success")
    {
    setAnswer(newAnswer);
  }
  }

  const updateOption = async (id: string, newText: string) => {
    const findOption = options.find((val) => { return id === val.id });
    const uploadedQuizQuestionOption = await uploadQuizQuestionOption(initialQuestion.id!, { ...findOption, value: newText } as QuizQuestionOption);
    if (uploadedQuizQuestionOption.status === "success")
      {
    setOptions(options.map(option => 
      option.id === id ? uploadedQuizQuestionOption.value[0] : option
    ))
  }
  }

  const addOption = async () => {
    const date = new Date().toISOString();
    const newOption: QuizQuestionOption = {
        created_at: date,
        value: 'New answer',
        order: options && options.length || 1,
        quiz_question_id: initialQuestion.id!,
        is_correct: false,
    }
    const uploadedQuizQuestionOption = await uploadQuizQuestionOption(initialQuestion.id!, newOption);
    if (uploadedQuizQuestionOption.status === "success")
    {
      setOptions([...options, uploadedQuizQuestionOption.value[0]]);
    }
  }

  const removeOption = async (id: string) => {

    const removedQuizQuestionOption = await removeQuizQuestionOption(id);
    if (removedQuizQuestionOption.status === "success")
    {
      setOptions(options.filter(option => option.id !== id))
    }
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

