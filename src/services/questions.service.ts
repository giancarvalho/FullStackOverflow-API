import { answerData, Question } from "../protocols/questions.interfaces";
import dayjs from "dayjs";
import * as questionsRepository from "../repositories/questions.repository";
import * as studentsRepository from "../repositories/students.repository";
import questionSchema from "../schemas/question.schema";
import { BadRequest, NotFound } from "../utils/error";
import { studentDB } from "../protocols/students.interface";
import formatDate from "../utils/formatDate";

const create = async (questionData: Question) => {
    const validation = questionSchema.validate(questionData);

    if (validation.error) throw new BadRequest("Question data is invalid.");

    const student: studentDB = await studentsRepository.find(
        questionData.student
    );

    if (!student) throw new BadRequest("Student not found");

    if (
        student.name !== questionData.student ||
        student.className !== questionData.class
    ) {
        throw new BadRequest(`Student name or class does not match record`);
    }

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
    let question = await questionsRepository.find(questionId);

    if (!question) throw new NotFound("Question does not exist");

    question = formatDate(question);

    if (!question.answered) {
        delete question.answeredAt;
        delete question.answeredBy;
        delete question.answer;
    }

    return question;
};

const findUnanswered = async () => {
    let unansweredQuestionList = await questionsRepository.findAllUnanswered();

    unansweredQuestionList = unansweredQuestionList.map((question) =>
        formatDate(question)
    );

    return unansweredQuestionList;
};

export { create, answer, find, findUnanswered };
