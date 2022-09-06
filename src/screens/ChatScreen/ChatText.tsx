import { format } from "date-fns";
import useMessages from "../../hooks/useMessages";
import Message from "../../models/Message";

interface ChatTextProps {
  message: Message;
}

const formatData = (timestamp: number) => {
  return format(timestamp, "HH:mm dd/MM/yy");
};

const ChatText = function ({ message }: ChatTextProps) {
  const { currentChat } = useMessages();

  if (!currentChat) return <div></div>;

  return (
    <div
      className={`chat ${
        currentChat!._id === message.sender ? "chat--sent" : ""
      }`}
    >
      <p className="chat__text">{message.text}</p>
      <span className="chat__date">
        {formatData(message.createdAt as number)}
      </span>
    </div>
  );
};

export default ChatText;
