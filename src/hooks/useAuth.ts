import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = function () {
  const { accessToken } = React.useContext(AuthContext);
  React.useDebugValue(accessToken);

  return useContext(AuthContext);
};
export default useAuth;
