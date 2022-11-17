import { axiosInstance } from "../utils";
import { useState, useEffect, useContext } from "react";
import { Navigation } from "../components/Navigation";
import { VideoLayout } from "../components/VideoLayout";
import { useParams } from "react-router";
import { VideoContext } from "../contexts/videosContext";
import { SideMenu } from "../components/SideMenu";
import { NavigationContext } from "../contexts/navigationContext";
import { Overlay } from "../components/Overlay";

export const VideoDisplay = () => {
  const currentVideo = useParams().videoId;
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { sideShow, setSideShow } = useContext(NavigationContext);
  const { setDislayedVideo, setDisplayedChannel } = useContext(VideoContext);
  const showDropDownMenu = (ev, value) => {
    ev.stopPropagation();
    if (value) {
      setShow(value);
    } else {
      setShow(!show);
    }
  };

  useEffect(() => {
    const loadVideo = async () => {
      const video = await axiosInstance.get(`/video/${currentVideo}`);
      setDislayedVideo(video.data);
      const channel = await axiosInstance.get(`/user/users/${video.data.ownerId}`);
      setDisplayedChannel(channel.data);
      setIsLoading(false);
    };
    const increaseView = async () => {
      await axiosInstance.put(`/video/view/${currentVideo}`);
    };
    const increaseTrendinvView = async () => {
      await axiosInstance.put(`/video/incrTrend/${currentVideo}`);
    };
    loadVideo();
    increaseView();
    increaseTrendinvView();
    return () => {
      setSideShow(false)
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div
      onClick={() => {
        setShow(false);
      }}
    >
      <Navigation showDropDownMenu={showDropDownMenu} show={show}></Navigation>
      {sideShow && (
        <>
          <SideMenu></SideMenu>
          <Overlay></Overlay>
        </>
      )}
      <main>{!isLoading && <VideoLayout></VideoLayout>}</main>
    </div>
  );
};
