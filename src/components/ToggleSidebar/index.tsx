import { IoMdChatbubbles } from "react-icons/io"
import useSidebar from "../../hooks/useSidebar";

const Sidebar = () => {
  const { setClassName } = useSidebar();

  return (
    <span className="toggle-sidebar" onClick={() => setClassName("")}>
      <IoMdChatbubbles size={30} />
    </span>
  );
};

export default Sidebar;
