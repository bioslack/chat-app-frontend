import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import AuthProvider from "./context/AuthProvider";
import MessagesProvider from "./context/MessagesProvider";
// import SocketProvider from "./context/SocketProvider";
import ChatProvider from "./context/ChatProvider";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <SocketProvider> */}
        <ChatProvider>
          <MessagesProvider>
            <App />
          </MessagesProvider>
        </ChatProvider>
      {/* </SocketProvider> */}
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();