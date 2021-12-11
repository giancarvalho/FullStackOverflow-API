import { v4 as tokenGenerator } from "uuid";
import connection from "../database";
import { Student, studentDB } from "../protocols/students.interface";

const find = async (studentName: string): Promise<studentDB> => {
    const result = await connection.query(
        `SELECT id, class_id AS "classId" FROM students WHERE name iLIKE $1`,
        [studentName]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
};

const findByToken = async (studentToken: string): Promise<studentDB> => {
    const result = await connection.query(
        `SELECT id, class_id AS "classId" FROM students WHERE token = $1`,
        [studentToken]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
};

const create = async (studentData: Student): Promise<string> => {
    let classId;

    const findClass = await connection.query(
        "SELECT * FROM classes WHERE name iLIKE $1",
        [studentData.class]
    );

    if (findClass.rowCount === 0) {
        const classInsertion = await connection.query(
            "INSERT INTO classes (name) VALUES ($1) RETURNING id;",
            [studentData.class]
        );

        classId = classInsertion.rows[0].id;
    } else {
        classId = findClass.rows[0].id;
    }

    const token = tokenGenerator();

    await connection.query(
        "INSERT INTO students (name, class_id, token) VALUES ($1, $2, $3) RETURNING token;",
        [studentData.name, classId, token]
    );

    return token;
};

export { find, create, findByToken };
