import Joi from "joi";

const studentSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    class: Joi.string().min(2).max(10).required(),
});

export default studentSchema;
