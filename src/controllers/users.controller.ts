import { Response, Request, NextFunction } from "express";
import * as usersService from "../services/users.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    try {
        const createUserRequest = await usersService.createStudent(userData);

        res.send(createUserRequest);
    } catch (error) {
        next(error);
    }
};

export { create };
