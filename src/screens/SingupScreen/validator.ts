import Joi from "joi";
import { FormSignupData } from "./reducer";

export const prepare = (data: FormSignupData) => ({
  name: data.name.value,
  email: data.email.value,
  password: data.password.value,
  confirmPassword: data.confirmPassword.value,
});

const schema = Joi.object({
  name: Joi.string().not(""),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8),
  confirmPassword: Joi.ref("password"),
});

export default schema;
