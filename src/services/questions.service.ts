import { answerData, Question } from "../protocols/questions.interfaces";
import dayjs from "dayjs";
import * as questionsRepository from "../repositories/questions.repository";
import * as studentsRepository from "../repositories/students.repository";
import questionSchema from "../schemas/question.schema";
import { BadRequest, NotFound } from "../utils/error";
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

const answer = async (answerData: answerData) => {
    const { answer, token, questionId } = answerData;

    const question = await questionsRepository.find(answerData.questionId);

    if (!question) throw new NotFound("Question not found");
    if (question.answered) throw new BadRequest("Question already answered");

    const student = await studentsRepository.findByToken(token);

    if (!student) throw new BadRequest("Student not found");

    const answerRequest = await questionsRepository.answer({
        answer,
        answeredBy: student.id,
        questionId,
    });

    return { id: answerRequest };
};

const find = async (questionId: number) => {
    const question = await questionsRepository.find(questionId);

    if (!question) throw new NotFound("Question does not exist");

    question.submitAt = dayjs(question.submitAt).format("YYYY-MM-DD HH:mm");

    if (question.answered) {
        question.answeredAt = dayjs(question.answeredAt).format(
            "YYYY-MM-DD HH:mm"
        );

        return question;
    }

    delete question.answeredAt;
    delete question.answeredBy;
    delete question.answer;

    return question;
};

export { create, answer, find };
