import { Navigation } from "../components/Navigation";
import { SideMenu } from "../components/SideMenu";
import { Main } from "../components/Main";
import React, { useState } from "react";
import "./Home.scss";

export const Home = () => {
  const [show, setShow] = useState(false);
  const showDropDownMenu = (ev, value) => {
    ev.stopPropagation();
    if (value) {
      setShow(value);
    } else {
      setShow(!show);
    }
  };
  return (
    <div
      className="homeWrapper"
      onClick={() => {
        setShow(false);
      }}
    >
      <Navigation showDropDownMenu={showDropDownMenu} show={show}></Navigation>
      <div className="sideAndMainWrapper">
        <SideMenu></SideMenu>
        <Main></Main>
      </div>
    </div>
  );
};
