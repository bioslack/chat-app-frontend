import Joi from "joi";
import { FormLoginData } from "./reducer";

export const prepare = (data: FormLoginData) => ({
  email: data.email.value,
  password: data.password.value,
});

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.base": "E-mail invalido",
    }),
  password: Joi.string().min(8),
});

export default schema;
