import React, { useCallback, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useChats from "../../hooks/useChats";
import useSearchChats from "../../hooks/useSearchChats";
import useUser from "../../hooks/useUser";
import Chat from "../../models/Chat";
import ChatContainer from "./ChatContainer";
import GroupDialog from "./GroupDialog";
import Profile from "./Profile";
import ProfileDialog from "./ProfileDialog";
import SearchBar from "./SearchBar";

interface SidebarProps {
  onSelectChat?: (user: Chat) => void;
}

const Sidebar = function (props: SidebarProps) {
  const { onSelectChat } = props;
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { chats, isLoading, hasNextPage } = useSearchChats(search, page);
  const intersection = useRef<IntersectionObserver>();
  const lastChatRef = useCallback(
    // @ts-ignore
    (chat) => {
      if (isLoading) return;

      if (intersection.current) intersection.current.disconnect();

      intersection.current = new IntersectionObserver((chats) => {
        if (chats[0].isIntersecting && hasNextPage) setPage((prev) => prev + 1);
      });

      if (chat) intersection.current.observe(chat);
    },
    [isLoading, hasNextPage]
  );

  return (
    <div className="sidebar">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="chat-list">
        {chats
          ?.filter((c) => c._id !== user?._id)
          .map((chat) => (
            <ChatContainer
              ref={lastChatRef}
              onSelectChat={onSelectChat}
              chat={chat}
              key={chat._id}
            />
          ))}
      </div>
      <Profile user={user} />
    </div>
  );
};

export default Sidebar;
