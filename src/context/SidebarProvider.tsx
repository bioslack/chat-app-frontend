import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface SidebarProviderProps {
  children?: ReactNode | ReactNode[];
}

type SidebarClassName = "sidebar--hidden" | "";

interface SidebarProviderData {
  className: SidebarClassName;
  setClassName: Dispatch<SetStateAction<SidebarClassName>>;
}

export const SidebarContext = React.createContext<SidebarProviderData>({
  className: "",
  setClassName: () => {},
});

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [className, setClassName] = useState<SidebarClassName>("");

  return (
    <SidebarContext.Provider value={{ className, setClassName }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
