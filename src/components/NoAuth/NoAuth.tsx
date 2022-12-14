import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NoAuth = function () {
  const { accessToken } = useAuth();
  const location = useLocation();

  return !accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default NoAuth;
