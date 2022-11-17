import { Navigation } from "../components/Navigation";
import { SideMenu } from "../components/SideMenu";
import { VideoForm } from "../components/VideoForm";
import { useState } from "react";

export const CreateVideo = () => {
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
        <VideoForm></VideoForm>
      </div>
    </div>
  );
};
