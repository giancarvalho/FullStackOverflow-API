import { Request, Response, NextFunction } from "express";
import { Question } from "../protocols/questions.interfaces";
import * as questionsService from "../services/questions.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const questionData: Question = req.body;

    try {
        const createQuestionRequest = await questionsService.create(
            questionData
        );

        res.send(createQuestionRequest);
    } catch (error) {
        next(error);
    }
};

const answer = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const token = req.headers.authorization?.replace("Bearer ", "");
    const { answer } = req.body;

    try {
        const answerQuestionRequest = await questionsService.answer({
            answer,
            token,
            questionId: Number(id),
        });

        res.send(answerQuestionRequest);
    } catch (error) {
        next(error);
    }
};

export { create, answer };
