import Chat from "../../models/Chat";
import HistoryItem from "./HistoryItem";
import "./styles.scss";

interface ChatHistoryProps {
  chats?: Chat[];
}

const ChatHistory = function ({ chats }: ChatHistoryProps) {
  return (
    <div className="chat-history">
      {chats?.map((item) => (
        <HistoryItem key={item._id} chat={item} />
      ))}
    </div>
  );
};

export default ChatHistory;
