import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Group from "../models/Group";
import User from "../models/User";

interface UsersProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

interface UsersProviderData {
  loading: boolean;
  user?: User;
  groups: Group[];
  error?: Object;
  getUsers: (query: string) => Promise<User[]>;
  refresh: () => Promise<void>;
}

export const UsersContext = React.createContext<UsersProviderData>({
  loading: false,
  refresh: async () => {},
  groups: [],
  getUsers: async () => {
    return [];
  },
});

const UserProvider = function (props: UsersProviderProps) {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<Object | undefined>(undefined);
  const axios = useAxiosPrivate();

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const requestUser = await axios.get("user");
      const requestGroup = await axios.get("groups");
      setUser(requestUser.data.user);
      setGroups(requestGroup.data.groups);
    } catch (err) {
      setUser(undefined);
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
        return [];
      }
    },
    [axios]
  );

  useEffect(() => {
    refresh();
  }, [accessToken, refresh]);

  return (
    <UsersContext.Provider
      value={{
        loading,
        user,
        error,
        groups,
        refresh,
        getUsers,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserProvider;
