import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface MenuProviderProps {
  children?: ReactNode | ReactNode[];
}

interface MenuProviderData {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export const MenuContext = React.createContext<MenuProviderData>({
  showMenu: false,
  setShowMenu: () => {},
});

const MenuProvider = function (props: MenuProviderProps) {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ showMenu, setShowMenu }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
