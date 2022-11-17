import { createContext, useState } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const [sideShow, setSideShow] = useState(false);

  const sideMenuToggle = () => {
    if (window.location.pathname.includes("watch")) {
      setSideShow(!sideShow);
    } else {
      setToggleSideMenu(!toggleSideMenu);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        toggleSideMenu,
        sideMenuToggle,
        setToggleSideMenu,
        sideShow,
        setSideShow
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
