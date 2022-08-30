import React, {
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSocket from "../hooks/useSocket";
import Message from "../models/Message";
import { v4 as uuid } from "uuid";
import Chat from "../models/Chat";

interface MessagesProviderProps {
  children?: ReactNode | ReactNode[];
}

interface MessagesProviderData {
  loading?: boolean;
  currentChat?: Chat;
  messages?: Message[];
  setCurrentChat?: Dispatch<SetStateAction<Chat | undefined>>;
  sendMessage?: (text: string) => void;
}

export const MessagesProviderContext =
  React.createContext<MessagesProviderData>({});

const MessagesProvider = function (props: MessagesProviderProps) {
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [currentChat, setCurrentChat] = React.useState<Chat | undefined>();
  const { decoded, accessToken } = useAuth();
  const { socket } = useSocket();
  const axios = useAxiosPrivate();

  const sendMessage = useCallback(
    (text: string) => {
      if (!currentChat) return;
      if (!decoded) return;

      const message: Message = {
        _id: uuid(),
        text,
        createdAt: Date.now(),
        receiver: currentChat._id,
        sender: decoded._id,
      };

      setMessages((prev) => [...prev, message]);
      socket.emit("send-message", message);
    },
    [decoded, currentChat, socket]
  );

  useEffect(() => {
    setMessages([]);
  }, [currentChat]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  useEffect(() => {
    // axios.get("/chat/mess")
  }, [axios, accessToken]);

  useEffect(() => {
    setCurrentChat(undefined);
  }, [decoded]);

  return (
    <MessagesProviderContext.Provider
      value={{ loading, messages, currentChat, sendMessage, setCurrentChat }}
    >
      {props.children}
    </MessagesProviderContext.Provider>
  );
};

export default MessagesProvider;
