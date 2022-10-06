import React from "react";
import { IMAGE_ROOT_SOURCE } from "../../api/axios";
import useSidebar from "../../hooks/useSidebar";
import Chat from "../../models/Chat";

interface ChatProps {
  chat: Chat;
  onSelectChat?: (chat: Chat) => void;
}

// @ts-ignore
const ChatContainer = React.forwardRef(
  ({ chat, onSelectChat }: ChatProps, ref) => {
    const { setClassName } = useSidebar();

    const handleSelectChat = () => {
      setClassName("sidebar--hidden");
      onSelectChat && onSelectChat(chat);
    };

    const chatBody = (
      <>
        <img
          className="card__picture"
          src={`${IMAGE_ROOT_SOURCE}/${chat.picture}`}
        />
        <div className="card__name">{chat.name}</div>
      </>
    );

    const content = ref ? (
      <div
        onClick={handleSelectChat}
        className="card"
        // @ts-ignore
        ref={ref}
      >
        {chatBody}
      </div>
    ) : (
      <div onClick={() => onSelectChat && onSelectChat(chat)} className="card">
        {chatBody}
      </div>
    );

    return content;
  }
);

export default ChatContainer;
