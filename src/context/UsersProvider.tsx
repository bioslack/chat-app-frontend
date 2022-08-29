import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import User from "../models/User";

interface UsersProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

interface UsersProviderData {
  users?: User[];
  loading: boolean;
}

export const UsersContext = React.createContext<UsersProviderData>({
  loading: false,
});

const UsersProvider = function (props: UsersProviderProps) {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const axios = useAxiosPrivate();
  const { decoded } = useAuth();

  React.useEffect(() => {
    setLoading(true);
    setUsers([]);
  }, [decoded, axios]);

  return (
    <UsersContext.Provider value={{ users, loading }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
