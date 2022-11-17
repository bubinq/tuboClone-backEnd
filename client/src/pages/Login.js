import { useState, useEffect } from "react";
import { LoginModal } from "../components/LoginModal";
import { Navigation } from "../components/Navigation";
import { SideMenu } from "../components/SideMenu";

export const Login = () => {
  const [toggle, setToggle] = useState(false);
  const showModalHandler = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navigation showModalHandler={showModalHandler}></Navigation>
      <div className="sideAndMainWrapper">
        <SideMenu showModalHandler={showModalHandler}></SideMenu>
        <LoginModal
          showModalHandler={showModalHandler}
          toggle={toggle}
        ></LoginModal>
      </div>
    </>
  );
};
