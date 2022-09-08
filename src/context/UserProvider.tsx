import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import User from "../models/User";

interface UsersProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

interface UsersProviderData {
  loading: boolean;
  user?: User;
  error?: Object;
  refresh: () => Promise<void>;
}

export const UsersContext = React.createContext<UsersProviderData>({
  loading: false,
  refresh: async () => {},
});

const UserProvider = function (props: UsersProviderProps) {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState<Object | undefined>(undefined);
  const axios = useAxiosPrivate();

  const refresh = async () => {
    try {
      setLoading(loading);
      const res = await axios.get("user");
      console.log("User data ", res.data.user);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      setError(err as Object);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) refresh();
  }, [accessToken]);

  return (
    <UsersContext.Provider value={{ loading, user, error, refresh }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserProvider;
