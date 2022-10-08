import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import AuthProvider from "./context/AuthProvider";
import MessagesProvider from "./context/MessagesProvider";
import SocketProvider from "./context/SocketProvider";
import UserProvider from "./context/UserProvider";
import SidebarProvider from "./context/SidebarProvider";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <SocketProvider>
            <MessagesProvider>
                <SidebarProvider>
                  <App />
                </SidebarProvider>
            </MessagesProvider>
          </SocketProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
