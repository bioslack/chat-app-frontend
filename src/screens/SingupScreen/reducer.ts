import { InputMessage } from "../../components/TextInput/TextInput";
import schema, { prepare } from "./validator";

type InputData = {
  value: string;
  message: string;
  messageType: InputMessage;
  showMessage: boolean;
};

type SignupFields = "name" | "email" | "password" | "confirmPassword";

type FormSignupAction =
  | { type: "ENTER_TEXT"; key: SignupFields; value: string }
  | { type: "VALIDATE" };

export interface FormSignupData {
  name: InputData;
  email: InputData;
  password: InputData;
  confirmPassword: InputData;
  disabled: boolean;
}

const messages = {
  name: "Informe o seu nome",
  email: "Informe um e-mail válido",
  password: "Informe uma senha com 8 caracteres",
  confirmPassword: "As senhas não correspondem",
};

const reducer = function (
  state: FormSignupData,
  action: FormSignupAction
): FormSignupData {
  switch (action.type) {
    case "ENTER_TEXT":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          value: action.value,
          message: "",
          showMessage: false,
        },
      };
    case "VALIDATE": {
      const validation = schema.validate(prepare(state));

      if (validation.error) {
        const regex = /"([^)]+)"/;
        const matches = regex.exec(`${validation.error}`);
        if (matches) {
          const key = matches[0].replace(/"/g, "") as SignupFields;

          return {
            ...state,
            [key]: {
              ...state[key],
              message: messages[key],
              showMessage: true,
              messageType: "danger",
            },
          };
        }
      }
      return { ...state };
    }
  }
};

export default reducer;
