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

export { create };
