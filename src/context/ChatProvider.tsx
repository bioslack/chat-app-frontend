import React, { useCallback, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Chat from "../models/Chat";

interface ChatProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

interface ChatProviderData {
  chats: Chat[];
  getChats: (
    search: string,
    page: number,
    options: AxiosRequestConfig
  ) => Promise<Chat[]>;
  error: Object;
  isLoading: boolean;
}

export const ChatContext = React.createContext<ChatProviderData>({
  chats: [],
  error: "",
  isLoading: false,
  getChats: async () => [],
});

const ChatProvider = function (props: ChatProviderProps) {
  const axios = useAxiosPrivate();
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [chats, setChats] = React.useState<Chat[]>([]);

  const getChats = async (
    search: string,
    page: number,
    options: AxiosRequestConfig
  ) => {
    const res = await axios.get(`/chats?search=${search}&page=${page}`, options);
    return res.data.chats as Chat[];
  };

  useEffect(() => {
    const controller = new AbortController();

    return () => controller.abort();
  }, [axios, accessToken]);

  return (
    <ChatContext.Provider value={{ chats, error, isLoading, getChats }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
