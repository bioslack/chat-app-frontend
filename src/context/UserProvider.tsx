import React, { useCallback, useEffect, useState } from "react";
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
  getUsers: (query: string) => Promise<User[]>;
  refresh: () => Promise<void>;
}

export const UsersContext = React.createContext<UsersProviderData>({
  loading: false,
  refresh: async () => {},
  getUsers: async () => {
    return [];
  },
});

const UserProvider = function (props: UsersProviderProps) {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState<Object | undefined>(undefined);
  const axios = useAxiosPrivate();

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("user");
      console.log("User data ", res.data.user);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      setError(err as Object);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  const getUsers = useCallback(
    async (query: string) => {
      try {
        const res = await axios.get(`users?name=${query}`);

        return res.data.users as User[];
      } catch (err) {
        console.log(err);
        return [];
      }
    },
    [axios]
  );

  useEffect(() => {
    if (accessToken) refresh();
  }, [accessToken, refresh]);

  return (
    <UsersContext.Provider value={{ loading, user, error, refresh, getUsers }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserProvider;
