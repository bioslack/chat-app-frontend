import { format } from "date-fns";
import { useMemo } from "react";
import useMessages from "../../hooks/useMessages";
import useUser from "../../hooks/useUser";
import Message from "../../models/Message";

interface ChatTextProps {
  message: Message;
}

const formatData = (timestamp: number) => {
  return format(timestamp, "HH:mm dd/MM/yy");
};

const ChatText = function ({ message }: ChatTextProps) {
  const { currentChat, participants } = useMessages();
  const { user } = useUser();
  const isGroup = useMemo(() => {
    if (currentChat) return Object.keys(currentChat).includes("members");
    return false;
  }, [currentChat]);
  const sender = useMemo(() => {
    const participant = participants.find((p) => p.id === message.sender);
    return participant?.name;
  }, [participants, message]);

  if (!currentChat) return <div></div>;

  return (
    <div
      className={`chat ${
        user?._id === message.sender ? "chat--received" : "chat--sent"
      }`}
    >
      {isGroup && <h6>{sender}</h6>}
      <p className="chat__text">{message.text}</p>
      <span className="chat__date">
        {formatData(message.createdAt as number)}
      </span>
    </div>
  );
};

export default ChatText;
