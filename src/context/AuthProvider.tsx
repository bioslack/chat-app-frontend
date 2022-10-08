import React, { ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { Buffer } from "buffer";
import axios, { axiosPrivate } from "../api/axios";
import { AxiosResponse } from "axios";

interface ISignupInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILoginInput {
  email: string;
  password: string;
}

interface AuthContextData {
  accessToken?: string;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  logout: () => Promise<void>;
  login: (input: ILoginInput) => Promise<AxiosResponse<any, any> | undefined>;
  signup: (input: ISignupInput) => Promise<AxiosResponse<any, any> | undefined>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children?: ReactNode | ReactNode[];
}

export const AuthContext = React.createContext<AuthContextData>({
  setAccessToken: () => {},
  logout: async () => {},
  login: () => new Promise(() => undefined),
  signup: () => new Promise(() => undefined),
  isLoading: false,
});

const AuthProvider = function ({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);

  const logout = async () => {
    try {
      setIsLoading(true);
      setAccessToken(undefined);
      const res = await axiosPrivate.delete("/auth/logout");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      // throw new Error(`${e}`);
    }
  };

  const login = async (input: ILoginInput) => {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.post("/auth/signin", input);
      setAccessToken(res.data.access);
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      throw new Error(`${e}`);
    }
  };

  const signup = async (input: ISignupInput) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/signup", input);
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      throw new Error(`${e}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        logout,
        login,
        isLoading,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
