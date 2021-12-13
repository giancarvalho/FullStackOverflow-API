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
    submitAt: Date | string;
    answered: boolean;
    student: string;
    class: string;
    tags: string;
    answeredAt?: Date | string;
    answeredBy?: string;
    answer?: string;
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
