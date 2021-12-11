import connection from "../database";
import { QuestionDB } from "../protocols/questions.interfaces";

const create = async (questionData: QuestionDB) => {
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

export { create };
