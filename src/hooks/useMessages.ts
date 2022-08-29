import React from "react";
import { MessagesProviderContext } from "../context/MessagesProvider";

const useMessages = function () {
  return React.useContext(MessagesProviderContext)
};

export default useMessages;
