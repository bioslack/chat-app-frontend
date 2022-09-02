import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import NoAuth from "../components/NoAuth";
import RequireAuth from "../components/RequireAuth/RequireAuth";
import ChatScreen2 from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import SingupScreen from "../screens/SingupScreen";

const Router = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route element={<NoAuth />}>
            <Route path="login" element={<LoginScreen />} />
            <Route path="signup" element={<SingupScreen />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<ChatScreen2 />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
