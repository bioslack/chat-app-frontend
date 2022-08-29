import React, { ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { Buffer } from "buffer";
import axios, { axiosPrivate } from "../api/axios";
import { AxiosResponse } from "axios";

type Decoded = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  iat: Number;
};

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
  decoded?: Decoded;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  logout: () => void;
  login: (input: ILoginInput) => Promise<AxiosResponse<any, any> | undefined>;
  signup: (input: ISignupInput) => Promise<AxiosResponse<any, any> | undefined>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children?: ReactNode | ReactNode[];
}

export const AuthContext = React.createContext<AuthContextData>({
  setAccessToken: () => {},
  logout: () => {},
  login: () => new Promise(() => undefined),
  signup: () => new Promise(() => undefined),
  isLoading: false,
});

const AuthProvider = function ({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);
  const decoded = React.useMemo<Decoded | undefined>(() => {
    if (accessToken && accessToken.split(".").length > 2) {
      const obj = JSON.parse(
        Buffer.from(accessToken?.split(".")[1] || "", "base64").toString()
      );

      return obj;
    }
    return undefined;
  }, [accessToken]);

  const logout = async () => {
    try {
      setIsLoading(true);
      await axiosPrivate.delete("/auth/logout");
      setAccessToken(undefined);
      setIsLoading(false);
    } catch (e) {
      setAccessToken(undefined);
      setIsLoading(false);
      throw new Error(`${e}`);
    }
  };

  const login = async (input: ILoginInput) => {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.post("/auth/signin", input);
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      throw new Error(`${e}`);
    }
  };

  const signup = async (input: ISignupInput) => {
    try {
      const res = await axios.post("/auth/signup", input);
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
        decoded,
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
