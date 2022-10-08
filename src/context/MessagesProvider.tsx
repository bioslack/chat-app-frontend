import React, {
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import { v4 as uuid } from "uuid";
import Group from "../models/Group";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSocket from "../hooks/useSocket";
import Message from "../models/Message";
import Chat from "../models/Chat";
import useUser from "../hooks/useUser";

interface ChatParticipant {
  id: string;
  name: string;
}

interface MessagesProviderProps {
  children?: ReactNode | ReactNode[];
}

interface MessagesProviderData {
  loading?: boolean;
  currentChat?: Chat;
  messages?: Message[];
  participants: ChatParticipant[];
  setCurrentChat?: Dispatch<SetStateAction<Chat | undefined>>;
  sendMessage?: (text: string) => void;
}

export const MessagesProviderContext =
  React.createContext<MessagesProviderData>({ participants: [] });

const MessagesProvider = function (props: MessagesProviderProps) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();
  const [participants, setChatParticipants] = useState<ChatParticipant[]>([]);
  const { accessToken } = useAuth();
  const { user } = useUser();
  const { socket } = useSocket();
  const axios = useAxiosPrivate();

  const sendMessage = useCallback(
    (text: string) => {
      if (!currentChat) return;
      if (!user) return;

      const message: Message = {
        _id: uuid(),
        text,
        createdAt: Date.now(),
        receiver: currentChat._id,
        sender: user._id,
      };

      setMessages((prev) => [...prev, message]);
      socket.emit("send-message", message);
    },
    [user, currentChat, socket]
  );

  useEffect(() => {
    let mounted = true;
    let key = "";

    if (!currentChat) return;

    if (Object.keys(currentChat).includes("members")) key = "group_id";
    else key = "_id";

    axios.get(`/chats/messages?${key}=${currentChat._id}`).then((res) => {
      if (mounted) setMessages(res.data.messages);
    });

    return () => {
      mounted = false;
    };
  }, [currentChat]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      if (!currentChat || !user) return;

      if (
        Object.keys(currentChat).includes("members") &&
        currentChat._id === message.receiver
      ) {
        setMessages((prev) => [...prev, message]);
        return;
      }

      if (
        (user._id === message.sender && currentChat._id === message.receiver) ||
        (user._id === message.receiver && currentChat._id === message.sender)
      )
        setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket, currentChat, user]);

  useEffect(() => {
    // axios.get("/chat/mess")
  }, [axios, accessToken]);

  useEffect(() => {
    setCurrentChat(undefined);
  }, [user]);

  useEffect(() => {
    if (!currentChat) return;
    if (!Object.keys(currentChat).includes("members")) return;

    const members = (currentChat as Group).members;

    axios
      .get(`chat/participants?participants=${JSON.stringify(members)}`)
      .then((res) => {
        setChatParticipants(res.data.participants);
      });
  }, [axios, currentChat]);

  return (
    <MessagesProviderContext.Provider
      value={{
        loading,
        messages,
        participants,
        currentChat,
        sendMessage,
        setCurrentChat,
      }}
    >
      {props.children}
    </MessagesProviderContext.Provider>
  );
};

export default MessagesProvider;
