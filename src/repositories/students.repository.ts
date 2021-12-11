import connection from "../database";
import { studentDB } from "../protocols/students.interface";

const find = async (studentName: string): Promise<studentDB> => {
    const result = await connection.query(
        `SELECT id, class_id AS "classId" FROM students WHERE name iLIKE $1`,
        [studentName]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
};

export { find };
