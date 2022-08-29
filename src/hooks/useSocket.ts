import React from "react";
import { SocketContext } from "../context/SocketProvider";

const useSocket = () => React.useContext(SocketContext);

export default useSocket;
