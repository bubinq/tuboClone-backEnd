import { RegisterModal } from "../components/RegisterModal";
import { Navigation } from "../components/Navigation";
import { SideMenu } from "../components/SideMenu";
import { useState } from "react";

export const Register = () => {
    const [toggle, setToggle] = useState(false)
    const showModalHandler = () => {
        setToggle(!toggle)
    }
  return (
    <>
      <Navigation></Navigation>
      <div className="sideAndMainWrapper">
        <SideMenu></SideMenu>
        <RegisterModal showModalHandler={showModalHandler} toggle={toggle}></RegisterModal>
      </div>
    </>
  );
};
