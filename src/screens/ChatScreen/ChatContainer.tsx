import React from "react";
import Chat from "../../models/Chat";

interface ChatProps {
  chat: Chat;
  onSelectChat?: (chat: Chat) => void;
}

// @ts-ignore
const ChatContainer = React.forwardRef(
  ({ chat, onSelectChat }: ChatProps, ref) => {
    const chatBody = (
      <>
        <img
          className="history-item__picture"
          src={`http://localhost:8888/img/${chat.picture}`}
        />
        <div className="history-item__name">{chat.name}</div>
      </>
    );

    const content = ref ? (
      <div
        onClick={() => onSelectChat && onSelectChat(chat)}
        className="history-item"
        // @ts-ignore
        ref={ref}
      >
        {chatBody}
      </div>
    ) : (
      <div
        onClick={() => onSelectChat && onSelectChat(chat)}
        className="history-item"
      >
        {chatBody}
      </div>
    );

    return content;
  }
);

export default ChatContainer;
