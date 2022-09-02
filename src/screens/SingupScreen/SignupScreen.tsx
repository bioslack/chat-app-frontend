import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import "./styles.scss";
import reducer, { FormSignupData } from "./reducer";
import schema, { prepare } from "./validator";
import useAuth from "../../hooks/useAuth";
import MessageDialog from "../../components/MessageDialog";

const formInitialState: FormSignupData = {
  name: {
    message: "",
    messageType: "okay",
    showMessage: false,
    value: "",
  },
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
  confirmPassword: {
    message: "",
    messageType: "okay",
    showMessage: false,
    value: "",
  },
  disabled: false,
};

const SignupScreen = function () {
  const [state, dispatch] = React.useReducer(reducer, formInitialState);
  const [signupMessage, setSignupMessage] = useState("");
  const { signup } = useAuth();

  const handleSignup = (event: FormEvent) => {
    event.preventDefault();
    dispatch({ type: "VALIDATE" });
    const { error } = schema.validate(prepare(state));

    signup(prepare(state)).catch((err) => {
      setSignupMessage("E-mail / senha inválidos");
    });

    if (error) return;
  };

  return (
    <div className="signup-screen">
      <form className="signup-screen__form" onSubmit={handleSignup}>
        <Heading type="h1" style={{ marginBottom: 15, color: "#000" }}>
          Casdastro
        </Heading>
        <TextInput
          className="signup-screen__textinput"
          placeholder="Nome"
          value={state.name.value}
          message={state.name.message}
          messageType={state.name.messageType}
          showMessages={state.name.showMessage}
          onChange={(event) =>
            dispatch({
              type: "ENTER_TEXT",
              key: "name",
              value: event.target.value,
            })
          }
          disabled={state.disabled}
        />
        <TextInput
          className="signup-screen__textinput"
          placeholder="E-mail"
          value={state.email.value}
          message={state.email.message}
          messageType={state.email.messageType}
          showMessages={state.email.showMessage}
          onChange={(event) =>
            dispatch({
              type: "ENTER_TEXT",
              key: "email",
              value: event.target.value,
            })
          }
          disabled={state.disabled}
        />
        <TextInput
          className="signup-screen__textinput"
          placeholder="Senha"
          type="password"
          value={state.password.value}
          message={state.password.message}
          messageType={state.password.messageType}
          showMessages={state.password.showMessage}
          onChange={(event) =>
            dispatch({
              type: "ENTER_TEXT",
              key: "password",
              value: event.target.value,
            })
          }
          disabled={state.disabled}
        />
        <TextInput
          className="signup-screen__textinput"
          placeholder="Confirmar senha"
          type="password"
          value={state.confirmPassword.value}
          message={state.confirmPassword.message}
          messageType={state.confirmPassword.messageType}
          showMessages={state.confirmPassword.showMessage}
          onChange={(event) =>
            dispatch({
              type: "ENTER_TEXT",
              key: "confirmPassword",
              value: event.target.value,
            })
          }
          disabled={state.disabled}
        />
        <Button type="submit" title="Cadastrar" style={{ marginBottom: 14 }} />
        <span>Já tem cadastro?&nbsp;</span>
        <Link to="/login">Entrar</Link>
      </form>
      {signupMessage && (
        <MessageDialog
          title="Mensagem"
          message={signupMessage}
          onClose={() => setSignupMessage("")}
        />
      )}
    </div>
  );
};

export default SignupScreen;
