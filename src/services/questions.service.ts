import { Question } from "../protocols/questions.interfaces";
import * as questionsRepository from "../repositories/questions.repository";
import * as studentsRepository from "../repositories/students.repository";
import questionSchema from "../schemas/question.schema";
import { BadRequest } from "../utils/error";
import { studentDB } from "../protocols/students.interface";

const create = async (questionData: Question) => {
    const validation = questionSchema.validate(questionData);

    if (validation.error) throw new BadRequest("Question data is invalid.");

    const student: studentDB = await studentsRepository.find(
        questionData.student
    );

    if (!student) throw new BadRequest("Student not found");

    const questionDataDB = {
        question: questionData.question,
        studendId: student.id,
        classId: student.classId,
        tags: questionData.tags,
    };

    const questionId = await questionsRepository.create(questionDataDB);

    return { id: questionId };
};

export { create };
