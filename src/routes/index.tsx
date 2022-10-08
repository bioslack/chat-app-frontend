import { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth/RequireAuth";
import useAuth from "../hooks/useAuth";
import ChatScreen2 from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import SingupScreen from "../screens/SingupScreen";

const Router = function () {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    navigate("/");
  }, [accessToken]);

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="login" element={<LoginScreen />} />
        <Route path="signup" element={<SingupScreen />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<ChatScreen2 />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
