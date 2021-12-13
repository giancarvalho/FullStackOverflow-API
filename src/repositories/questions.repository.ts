import connection from "../database";
import {
    answerDataDB,
    QuestionDB,
    RetrievedQuestion,
    UnansweredQuestion,
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
        'SELECT questions.question, students.name AS student, classes.name AS class, questions.tags, questions.answered, questions.submitted_at AS "submitAt", answers.answer, users.name AS "answeredBy", answers.answered_at AS "answeredAt" FROM questions LEFT JOIN students ON questions.student_id=students.id LEFT JOIN classes ON questions.class_id = classes.id LEFT JOIN answers ON questions.answer_id = answers.id LEFT JOIN students AS users ON answers.answered_by=users.id  WHERE questions.id = $1;',
        [questionId]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
};

const findAllUnanswered = async (): Promise<UnansweredQuestion[]> => {
    const result = await connection.query(
        'SELECT questions.id, questions.question, students.name AS student, classes.name AS class, questions.submitted_at AS "submitAt" FROM questions JOIN students ON questions.student_id=students.id LEFT JOIN classes ON questions.class_id = classes.id WHERE questions.answered = false;'
    );

    return result.rows;
};

export { create, answer, find, findAllUnanswered };
