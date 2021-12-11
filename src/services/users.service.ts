import { Student } from "../protocols/students.interface";
import studentSchema from "../schemas/student.schema";
import { BadRequest, Conflict } from "../utils/error";
import * as studentsRepository from "../repositories/students.repository";

const createStudent = async (studentData: Student) => {
    const validation = studentSchema.validate(studentData);

    if (validation.error) throw new BadRequest("Student data is invalid");

    const isStudent = await studentsRepository.find(studentData.name);

    if (isStudent) throw new Conflict("Student is already registered");

    const studentToken = await studentsRepository.create(studentData);

    return { token: studentToken };
};

export { createStudent };
