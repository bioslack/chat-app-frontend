import { useContext } from "react";
import { ChatContext } from "../context/ChatProvider";

const useChats = () => useContext(ChatContext);

export default useChats;
