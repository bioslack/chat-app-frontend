import React, { useContext } from "react";
import { UsersContext } from "../context/UsersProvider";

const useUsers = function () {
  const { users } = React.useContext(UsersContext);
  React.useDebugValue(users);

  return useContext(UsersContext);
};
export default useUsers;
