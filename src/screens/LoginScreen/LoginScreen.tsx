import React, { FormEvent, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import TextInput from "../../components/TextInput";
import useAuth from "../../hooks/useAuth";
import reducer, { FormLoginData } from "./reducer";

import "./styles.scss";
import schema, { prepare } from "./validator";
import MessageDialog from "../../components/MessageDialog";
import Loading from "../../components/Loading";

const formInitialState: FormLoginData = {
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

const LoginScreen = function () {
  const [state, dispatch] = React.useReducer(reducer, formInitialState);
  const { login, isLoading } = useAuth();
  const [loginMessage, setLoginMessage] = React.useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = useCallback(
    function (event: FormEvent) {
      event.preventDefault();
      dispatch({ type: "VALIDATE" });

      const { error } = schema.validate(prepare(state));

      if (error) return;

      dispatch({ type: "DISABLE" });
      login(prepare(state))
        .then(() => navigate(from, { replace: true }))
        .catch(() => {
          setLoginMessage("E-mail / senha inválidos");
          dispatch({ type: "RESET" });
        })
        .finally(() => dispatch({ type: "ENABLE" }));
    },
    [state, from, login, navigate]
  );

  useEffect(() => {});

  if (isLoading) {
    return <Loading />;
  }

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
        <MessageDialog
          title="Mensagem"
          message={loginMessage}
          onClose={() => setLoginMessage("")}
        />
      )}
    </div>
  );
};

export default LoginScreen;
