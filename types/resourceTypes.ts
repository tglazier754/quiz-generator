

export type QuizQuestion = {
    question: string;
    answer: string;
}
export type Resource = {
    id?: string;
    url?: File | string | null;
    value: string;
    name: string;
    description: string;
    created_at?: string;//date
    last_modified?: string;//date
    type?: string;
    questions?: QuizQuestion[];
};