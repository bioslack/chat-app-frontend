import React, { useEffect } from "react";
import "./styles.scss";
import Sidebar from "./Sidebar";
import MessageTextInput from "../../components/MessageTextInput";
import useMessages from "../../hooks/useMessages";
import ChatText from "./ChatText";
import Chat from "../../models/Chat";
import ChatHeader from "./ChatHeader";

const ChatScreen = function () {
  const [selectedChat, setSelectedChat] = React.useState<Chat>();
  const { sendMessage, setCurrentChat, messages } = useMessages();
  const messagesDivRef = React.useRef<HTMLDivElement>();

  const handleSelectChat = function (chat: Chat) {
    setSelectedChat(chat);
    setCurrentChat && setCurrentChat(chat);
  };

  const handleSendMessage = function (message: string) {
    sendMessage && sendMessage(message);
  };

  React.useEffect(() => {
    const scrollValue = messagesDivRef.current?.scrollHeight || 0;
    messagesDivRef.current?.scrollTo({ top: scrollValue });
  }, [messages]);

  return (
    <div className="chat-screen">
      <Sidebar onSelectChat={handleSelectChat} />
      <div className="chat-area">
        {selectedChat && <ChatHeader selectedChat={selectedChat} />}
        {/* @ts-ignore */}
        <div ref={messagesDivRef} className="chat-area__messages">
          {messages?.map((m, index) => (
            <ChatText key={index} message={m} />
          ))}
        </div>
        {selectedChat && (
          <div className="chat-area__input-area">
            <MessageTextInput sendMessage={handleSendMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;
