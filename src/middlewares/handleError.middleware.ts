import { GeneralError } from "../utils/error";
import { Request, Response, NextFunction } from "express";

const handleErrors = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof GeneralError) {
        return res.status(error.getCode()).send(error.message);
    }

    res.sendStatus(500);
};

export default handleErrors;
