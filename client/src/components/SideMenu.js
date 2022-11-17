import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { SubscribedUsers } from "./SubscribedUsers";
import { axiosInstance } from "../utils";
import { VideoContext } from "../contexts/videosContext";
import { NavigationContext } from "../contexts/navigationContext";

export const SideMenu = ({ showModalHandler }) => {
  const { authUser, setAuthUser, subbedChannels, setSubbedChannels } =
    useContext(AuthContext);
  const { selectedMenu, setSelectedMenu, initialMenuState } =
    useContext(VideoContext);
  const { toggleSideMenu } = useContext(NavigationContext);

  useEffect(() => {
    if (authUser !== null) {
      const getMe = async () => {
        const myChannel = await axiosInstance.get("/user/me");
        setAuthUser(myChannel.data);
        return myChannel.data;
      };
      getMe().then((res) => {
        const loadSubbedChannels = async () => {
          setSubbedChannels([]);
          res.subscribedChannels.map(async function (channel) {
            const currChannel = await axiosInstance.get(`/user/users/${channel}`);
            setSubbedChannels((oldData) => [...oldData, currChannel.data]);
          });
        };
        loadSubbedChannels();
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <aside>
      <div className={toggleSideMenu ? "menuWrapper" : "menuToggle"}>
        <div className={toggleSideMenu ? "videosWrapper" : "videoToggle"}>
          <ul>
            <Link
              to="/"
              onClick={() => {
                setSelectedMenu({ ...initialMenuState, home: true });
              }}
              className={selectedMenu.home ? "selected" : ""}
            >
              <li>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/office-293/128/_Building_home_house-08-256.png"
                  alt="Home Page"
                ></img>
                <span>Home</span>
              </li>
            </Link>
            <Link
              to="/trending"
              onClick={() => {
                setSelectedMenu({ ...initialMenuState, explore: true });
              }}
              className={selectedMenu.explore ? "selected" : ""}
            >
              <li>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/explore-256.png"
                  alt="Explore Page"
                ></img>
                <span>Explore</span>
              </li>
            </Link>
            <Link
              to="/subs"
              onClick={() => {
                setSelectedMenu({ ...initialMenuState, subs: true });
              }}
              className={selectedMenu.subs ? "selected" : ""}
            >
              <li>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2482/24/subscription-256.png"
                  alt="Subscription Page"
                ></img>
                <span>Subscriptions</span>
              </li>
            </Link>
          </ul>
        </div>
        {toggleSideMenu && (
          <>
            <div className="sidehL"></div>
            <div className="userActivity">
              <ul>
                <Link
                  to="/"
                  onClick={() => {
                    setSelectedMenu({ ...initialMenuState, library: true });
                  }}
                  className={selectedMenu.library ? "selected" : ""}
                >
                  <li>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/video-library-1781676-1518357.png"
                      alt="Library Page"
                    ></img>
                    <span>Library</span>
                  </li>
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    setSelectedMenu({ ...initialMenuState, history: true });
                  }}
                  className={selectedMenu.history ? "selected" : ""}
                >
                  <li>
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/material-core/21/history-512.png"
                      alt="History Page"
                    ></img>
                    <span>History</span>
                  </li>
                </Link>
              </ul>
            </div>
            <div className="sidehL"></div>
            {!authUser && (
              <>
                <div className="signInSection">
                  <div className="signInTextWrapper">
                    <p>Sign in to like videos, comment, and subscribe.</p>
                  </div>
                  <Link to="/login" onClick={showModalHandler}>
                    <div className="signInBtn">
                      <img
                        src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-6/24/user-circle-512.png"
                        alt="signInPerson"
                      ></img>
                      <button className="signIn">Sign In</button>
                    </div>
                  </Link>
                </div>
                <div className="sidehL"></div>
              </>
            )}

            <div className="subscriptionsSection">
              <h3 className="subsHeading">Subscriptions</h3>
              {subbedChannels?.map((channel) => (
                <SubscribedUsers
                  key={channel._id}
                  channel={channel}
                ></SubscribedUsers>
              ))}
            </div>
            <div className="sidehL"></div>
            <div className="exploreSection">
              <div className="music">
                <ul>
                  <Link to="/">
                    <li>
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/social-media-2482/24/youtube_music-512.png"
                        alt="Explore Music"
                      ></img>
                      <span>Music</span>
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="gaming">
                <ul>
                  <Link to="/">
                    <li>
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/multimedia-26/24/multimedia-19-512.png"
                        alt="Explore Gaming"
                      ></img>
                      <span>Gaming</span>
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="sports">
                <ul>
                  <Link to="/">
                    <li>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/epic-outlines/30/basketball-512.png"
                        alt="Explore Sports"
                      ></img>
                      <span>Sports</span>
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="movies">
                <ul>
                  <Link to="/">
                    <li>
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/multimedia-344/24/clapper-512.png"
                        alt="Explore Movies"
                      ></img>
                      <span>Movies</span>
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="news">
                <ul>
                  <Link to="/">
                    <li>
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-512.png"
                        alt="Explore News"
                      ></img>
                      <span>News</span>
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="live">
                <ul>
                  <Link to="/">
                    <li>
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/interface-set-vol-2/50/Live-512.png"
                        alt="Explore Live"
                      ></img>
                      <span>Live</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="sidehL"></div>
            <div className="settings">
              <ul>
                <Link to="">
                  <li>
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Settings-512.png"
                      alt="Setting"
                    ></img>
                    <span>Settings</span>
                  </li>
                </Link>
              </ul>
            </div>
            <div className="sidehL"></div>
            <footer>
              <div className="infoPages">
                <span>About Press Copyright</span>
                <span>Contact us Creators</span>
                <span>Advertise Developers</span>
              </div>
            </footer>
          </>
        )}
      </div>
    </aside>
  );
};
