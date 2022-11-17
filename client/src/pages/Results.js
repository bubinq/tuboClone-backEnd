import { useContext, useState } from "react";
import { Navigation } from "../components/Navigation";
import { SideMenu } from "../components/SideMenu";
import { VideoContext } from "../contexts/videosContext";
import { VideoCardSearching } from "../components/VideoCardSearching";
import { UsersContext } from "../contexts/usersContext";
import { NavigationContext } from "../contexts/navigationContext";

export const Results = () => {
  const { videos } = useContext(VideoContext);
  const { users } = useContext(UsersContext);
  const {toggleSideMenu} = useContext(NavigationContext)

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
    <div className="resultsWrapper" onClick={() => {setShow(false)}}>
      <Navigation showDropDownMenu={showDropDownMenu} show={show}></Navigation>
      <div className="sideAndMainWrapper">
        <SideMenu></SideMenu>
        <main>
          <div className={toggleSideMenu? "contentWrapperResults" : "contentWrapperResultsToggle"}>
            {videos &&
              videos.map((video) => (
                <VideoCardSearching
                  key={video._id}
                  video={video}
                  users={users}
                ></VideoCardSearching>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};
