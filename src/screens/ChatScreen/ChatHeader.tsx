import useSocket from "../../hooks/useSocket";
import Chat from "../../models/Chat";

interface ChatHeaderProps {
  selectedChat: Chat;
}

const ChatHeader = ({ selectedChat }: ChatHeaderProps) => {
  const { connected } = useSocket();

  return (
    <div className="chat-header">
      <img
        className="chat-header__picture"
        src={`http://localhost:8888/img/${selectedChat.picture}`}
      />
      <div>
        <div className="chat-header__name">{selectedChat.name}</div>
        {connected.includes(selectedChat._id) && (
          <div className="chat-header__status">online</div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
