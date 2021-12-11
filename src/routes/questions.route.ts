import express from "express";
import * as questionsController from "../controllers/questions.controller";

const route = express.Router();

route.post("", questionsController.create);
route.post("/:id", questionsController.answer);

export default route;
