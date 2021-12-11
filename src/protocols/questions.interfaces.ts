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

export { Question, QuestionDB };
