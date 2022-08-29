import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Chat from "../models/Chat";

interface ChatProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

interface ChatProviderData {
  chats: Chat[];
  error: Object;
  isLoading: boolean;
}

export const ChatContext = React.createContext<ChatProviderData>({
  chats: [],
  error: "",
  isLoading: false,
});

const ChatProvider = function (props: ChatProviderProps) {
  const axios = useAxiosPrivate();
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [chats, setChats] = React.useState<Chat[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/chats")
      .then((res) => setChats(res.data.chats))
      .catch((err) => setError(`${err}`))
      .finally(() => setIsLoading(false));
  }, [axios, accessToken]);

  return (
    <ChatContext.Provider value={{ chats, error, isLoading }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
