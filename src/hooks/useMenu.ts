import React from "react";
import { MenuContext } from "../context/MenuProvider";

const useMenu = () => React.useContext(MenuContext);

export default useMenu;
