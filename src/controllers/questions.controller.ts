import { Request, Response } from "express";

const create = (req: Request, res: Response) => {
    try {
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
};

export { create };
