import Joi from "joi";

const questionSchema = Joi.object({
    question: Joi.string().min(3).max(60).required(),
    student: Joi.string().min(3).max(60).required(),
    class: Joi.string().min(2).max(10).required(),
    tags: Joi.string().min(3).max(60).required(),
});

export default questionSchema;
