import useSocket from "../../hooks/useSocket";
import Chat from "../../models/Chat";
import ToggleSidebar from "../../components/ToggleSidebar";
import { IMAGE_ROOT_SOURCE } from "../../api/axios";

interface ChatHeaderProps {
  selectedChat: Chat;
}

const ChatHeader = ({ selectedChat }: ChatHeaderProps) => {
  const { connected } = useSocket();

  return (
    <div className="chat-header">
      <img
        className="chat-header__picture"
        src={`${IMAGE_ROOT_SOURCE}/${selectedChat.picture}`}
      />
      <div style={{ flex: 1 }}>
        <div className="chat-header__name">{selectedChat.name}</div>
        {connected.includes(selectedChat._id) && (
          <div className="chat-header__status">online</div>
        )}
      </div>
      <ToggleSidebar />
    </div>
  );
};

export default ChatHeader;
