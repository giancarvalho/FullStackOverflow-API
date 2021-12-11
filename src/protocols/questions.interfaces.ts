interface Question {
    question: string;
    student: string;
    class: string;
    tags: string;
}

interface QuestionDB {
    question: string;
    studendId: number;
    classId: number;
    tags: string;
}

interface RetrievedQuestion extends QuestionDB {
    submittedAt: Date;
    answerId: number;
    answered: boolean;
}

interface answerData {
    answer: string;
    token: string;
    questionId: number;
}

interface answerDataDB {
    answer: string;
    answeredBy: number;
    questionId: number;
}

export { Question, QuestionDB, answerDataDB, answerData, RetrievedQuestion };
