"use client";

export const QuizCard = (props: { question: string, answer: string }) => {

    const { question, answer } = props;

    return (
        <div className="quiz-card">
            <p>Question</p>
            <p>{question}</p>
            <p>Answer</p>
            <p>{answer}</p>
        </div>
    )
}

export default QuizCard;