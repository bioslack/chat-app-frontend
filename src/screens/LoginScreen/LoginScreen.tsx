import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import TextInput from "../../components/TextInput";
import useAuth from "../../hooks/useAuth";
import reducer, { FormLoginData } from "./reducer";
import { MdClose } from "react-icons/md";

import "./styles.scss";
import schema, { prepare } from "./validator";

const formInitialState: FormLoginData = {
  email: {
    message: "",
    messageType: "okay",
    showMessage: false,
    value: "pereira.luishm@gmail.com",
  },
  password: {
    message: "",
    messageType: "okay",
    showMessage: false,
    value: "12345678",
  },
  disabled: false,
};

const LoginScreen = function () {
  const [state, dispatch] = React.useReducer(reducer, formInitialState);
  const { login } = useAuth();
  const [loginMessage, setLoginMessage] = React.useState("");

  const handleSubmit = function (event: FormEvent) {
    event.preventDefault();
    dispatch({ type: "VALIDATE" });

    const { error } = schema.validate(prepare(state));

    if (error) return;

    dispatch({ type: "DISABLE" });
    login(prepare(state)).catch((err) => {
      setLoginMessage("E-mail / senha inválidos");
      dispatch({ type: "RESET" });
    });
  };

  return (
    <div className="login-screen">
      <form onSubmit={handleSubmit}>
        <div className="login-screen__form">
          <Heading type="h1" style={{ marginBottom: 15, color: "#000" }}>
            Entrar
          </Heading>
          <TextInput
            className="login-screen__textinput"
            placeholder="E-mail"
            type="text"
            value={state.email.value}
            message={state.email.message}
            messageType={state.email.messageType}
            showMessages={state.email.showMessage}
            disabled={state.disabled}
            onChange={(event) =>
              dispatch({
                type: "ENTER_TEXT",
                key: "email",
                value: event.target.value,
              })
            }
          />
          <TextInput
            className="login-screen__textinput"
            placeholder="Password"
            type="password"
            value={state.password.value}
            message={state.password.message}
            messageType={state.password.messageType}
            showMessages={state.password.showMessage}
            disabled={state.disabled}
            onChange={(event) =>
              dispatch({
                type: "ENTER_TEXT",
                key: "password",
                value: event.target.value,
              })
            }
          />
          <Button type="submit" title="Login" style={{ marginBottom: 15 }} />
          <span>Ainda não tem uma conta?&nbsp;</span>
          <Link to="/signup">Cadastre-se</Link>
        </div>
      </form>
      {loginMessage && (
        <div className="login-dialog__overlay">
          <div className="login-dialog">
            <div
              className="login-dialog__close"
              onClick={() => setLoginMessage("")}
            >
              <MdClose size={25} color="black" />
            </div>
            <div className="login-dialog__title">Mensagem</div>
            <div className="login-dialog__message">{loginMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
