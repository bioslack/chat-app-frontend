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
          className="card__picture"
          src={`http://localhost:8888/img/${chat.picture}`}
        />
        <div className="card__name">{chat.name}</div>
      </>
    );

    const content = ref ? (
      <div
        onClick={() => onSelectChat && onSelectChat(chat)}
        className="card"
        // @ts-ignore
        ref={ref}
      >
        {chatBody}
      </div>
    ) : (
      <div
        onClick={() => onSelectChat && onSelectChat(chat)}
        className="card"
      >
        {chatBody}
      </div>
    );

    return content;
  }
);

export default ChatContainer;
