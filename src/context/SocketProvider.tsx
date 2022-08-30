import React, { ReactNode, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import Message from "../models/Message";

const socket = io("ws://localhost:8888");

interface SocketProviderProps {
  children?: ReactNode | ReactNode[];
}

interface SocketProviderData {
  isConnected: boolean;
  emitMessage: (message: Message) => void;
  socket: Socket;
  connected: string[];
}

export const SocketContext = React.createContext<SocketProviderData>({
  isConnected: false,
  emitMessage: (_message: Message) => {},
  socket,
  connected: [],
});

const SocketProvider = function ({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const { decoded } = useAuth();
  const [connected, setConnected] = useState<string[]>([]);

  const emitMessage = React.useCallback(
    (message: Message) => {
      if (!decoded) return;
      socket.emit("send-message", message);
    },
    [decoded]
  );

  React.useEffect(() => {
    if (decoded) {
      socket.connect();
      socket.emit("user-connected", decoded._id);
      console.log("Connected to the backend");
    }

    if (!decoded) {
      socket.disconnect();
    }
  }, [decoded]);

  React.useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    socket.on("users-list", (list) => {
      setConnected(list);
    });

    return () => {
      socket.off("users-list");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ isConnected, emitMessage, socket, connected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
