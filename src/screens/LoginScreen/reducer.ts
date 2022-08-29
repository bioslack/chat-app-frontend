import { InputMessage } from "../../components/TextInput/TextInput";
import schema, { prepare } from "./validator";

type InputData = {
  value: string;
  message: string;
  messageType: InputMessage;
  showMessage: boolean;
};

type LoginFields = "email" | "password";

type FormLoginAction =
  | { type: "ENTER_TEXT"; key: LoginFields; value: string }
  | { type: "VALIDATE" }
  | { type: "RESET" }
  | { type: "DISABLE" };

export interface FormLoginData {
  email: InputData;
  password: InputData;
  disabled: boolean;
}

const messages = {
  email: "Informe um e-mail válido",
  password: "Informe uma senha com 8 caracteres",
};

const reducer = function (
  state: FormLoginData,
  action: FormLoginAction
): FormLoginData {
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

      if (!validation.error) return { ...state };

      const regex = /"([^)]+)"/;
      const matches = regex.exec(`${validation.error}`);

      const key = matches![0].replace(/"/g, "") as LoginFields;

      return {
        ...state,
        [key]: {
          ...state[key],
          message: messages[key],
          showMessage: true,
          messageType: "danger",
        },
        disabled: false,
      };
    }

    case "RESET": {
      return {
        email: {
          message: "",
          messageType: "okay",
          showMessage: false,
          value: "",
        },
        password: {
          message: "",
          messageType: "okay",
          showMessage: false,
          value: "",
        },
        disabled: false,
      };
    }

    case "DISABLE": {
      return { ...state, disabled: true };
    }
  }
};

export default reducer;
