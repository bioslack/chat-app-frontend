import React, { useContext } from "react";
import { UsersContext } from "../context/UserProvider";

const useUser = function () {
  return useContext(UsersContext);
};

export default useUser;
