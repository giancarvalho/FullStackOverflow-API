import express from "express";
import * as questionsController from "../controllers/questions.controller";

const route = express.Router();

route.post("", questionsController.create);
route.post("/:id", questionsController.answer);
route.get("/:id", questionsController.get);
route.get("", questionsController.getUnanswered);

export default route;
