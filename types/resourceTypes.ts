

export type QuizQuestion = {
    id?: string;
    resource_id?: string;
    created_at: string;
    question: string;
    answer: string;
    type: string;
    expected_duration: string;
    order: number;
    quiz_question_options?: QuizQuestionOption[];
}
export type QuizQuestionOption = {
    created_at: string;
    id?: string;
    order: number;
    quiz_question_id: string;
    value: string;
    is_correct: boolean;
}

export type Resource = {
    [name: string]: string | number | boolean | undefined | QuizQuestion[] | File | null;
    id?: string;
    url?: File | string | null;
    value: string;
    name: string;
    description: string;
    created_at?: string;//date
    last_modified?: string;//date
    type?: string;
    quiz_questions?: QuizQuestion[];
    origin: string,
    archived: boolean,
    expected_duration: number,
    grade_level: string,

};


export interface ResourceHash {
    [id: string]: Resource;
}