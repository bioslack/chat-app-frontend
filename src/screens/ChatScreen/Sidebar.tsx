import React, { useCallback, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import useChats from "../../hooks/useChats";
import useSearchChats from "../../hooks/useSearchChats";
import useUser from "../../hooks/useUser";
import Chat from "../../models/Chat";
import ChatContainer from "./ChatContainer";
import GroupDialog from "./GroupDialog";
import ProfileDialog from "./ProfileDialog";
import SearchBar from "./SearchBar";

interface SidebarProps {
  onSelectChat?: (user: Chat) => void;
}

const Sidebar = function (props: SidebarProps) {
  const { onSelectChat } = props;
  const { logout } = useAuth();
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
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

  const onChange = function () {
    setShowMenu((prev) => !prev);
  };

  const onBlur = function () {
    setTimeout(() => setShowMenu(false), 200);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__search">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="sidebar__history">
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
      <div className="sidebar__profile-bar">
        <div className="sidebar__picture">
          <img
            src={`http://localhost:8888/img/${user?.picture}`}
            alt="profile"
          />
        </div>
        <div className="sidebar__name">{user?.name}</div>
        <div className="floating-menu__button">
          <input
            type="checkbox"
            onBlur={onBlur}
            onChange={onChange}
            checked={showMenu}
          />
          <BsThreeDotsVertical color="#fff" size={25} />
          <ul className="floating-menu">
            <li
              onClick={() => setShowGroupDialog(true)}
              className="floating-menu__item"
            >
              Criar grupo
            </li>
            <li
              className="floating-menu__item"
              onClick={() => setShowProfileDialog(true)}
            >
              Configurações
            </li>
            <li onClick={logout} className="floating-menu__item">
              Logout
            </li>
          </ul>
        </div>
      </div>
      <ProfileDialog
        visible={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
      />
      <GroupDialog
        visible={showGroupDialog}
        onClose={() => setShowGroupDialog(false)}
      />
    </div>
  );
};

export default Sidebar;
