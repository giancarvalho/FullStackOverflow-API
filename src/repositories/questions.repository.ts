import connection from "../database";
import {
    answerDataDB,
    QuestionDB,
    RetrievedQuestion,
} from "../protocols/questions.interfaces";

const create = async (questionData: QuestionDB): Promise<number> => {
    const questionInsertion = await connection.query(
        "INSERT INTO questions (question, student_id, class_id, tags) VALUES ($1, $2, $3, $4) RETURNING id;",
        [
            questionData.question,
            questionData.studendId,
            questionData.classId,
            questionData.tags,
        ]
    );

    return questionInsertion.rows[0].id;
};

const answer = async (answerDataDB: answerDataDB) => {
    const insertAnswer = await connection.query(
        "INSERT INTO answers (answer, answered_by) VALUES ($1, $2) RETURNING id;",
        [answerDataDB.answer, answerDataDB.answeredBy]
    );

    const answerId = insertAnswer.rows[0].id;

    await connection.query(
        "UPDATE questions SET answer_id=$1, answered=true WHERE id = $2",
        [answerId, answerDataDB.questionId]
    );

    return answerId;
};

const find = async (questionId: number): Promise<RetrievedQuestion> => {
    const result = await connection.query(
        "SELECT * FROM questions WHERE id = $1",
        [questionId]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
};

export { create, answer, find };
