import { createContext, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const VideoContext = createContext();

const initialMenuState = {
  home: false,
  explore: false,
  subs: false,
  library: false,
  history: false,
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useSessionStorage("videos", []);
  const [displayedVideo, setDislayedVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [displayedChannel, setDisplayedChannel] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState({
    home: true,
    explore: false,
    subs: false,
    library: false,
    history: false,
  });
  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        selectedMenu,
        setSelectedMenu,
        initialMenuState,
        displayedVideo,
        setDislayedVideo,
        likes,
        setLikes,
        displayedChannel,
        setDisplayedChannel
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
