import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useState } from "react";
import { axiosInstance } from "../utils";
import { VideoContext } from "../contexts/videosContext";
import { NavigationContext } from "../contexts/navigationContext";
import { useWindowSize } from "../hooks/useWindowSize";

export const Navigation = ({ showDropDownMenu, show, showModalHandler }) => {
  const { authUser, setAuthUser, setSubbedChannels } = useContext(AuthContext);
  const { setVideos } = useContext(VideoContext);
  const { sideMenuToggle, setToggleSideMenu } = useContext(NavigationContext);
  const [searchValue, setSearchValue] = useState("");
  const navigateTo = useNavigate();
  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 1062 && !window.location.pathname.includes("watch")) {
      setToggleSideMenu(false);
    } else {
      setToggleSideMenu(true);
    }
    //eslint-disable-next-line
  }, [size.width]);

  const searchVideoHandler = async (ev) => {
    ev.preventDefault();
    try {
      if (searchValue.trim()) {
        const response = await axiosInstance.post("/video/search", {
          search: searchValue,
        });
        setVideos(response.data);
        navigateTo("/results");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const logoutHandler = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await axiosInstance.get("/auth/logout");
      setAuthUser(null);
      setSubbedChannels([]);
      sessionStorage.removeItem("authUser");

      navigateTo("/", { redirect: true });
    }
  };

  return (
    <header>
      <div className="headerWrapper">
        <nav>
          <div className="logoWrapper">
            <div className="menuBtnWrapper" onClick={sideMenuToggle}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <Link to="/">
              <div className="logo" title="YouTube Home">
                <img
                  className="logoImg"
                  src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg"
                  alt="YouTube Logo"
                ></img>
              </div>
            </Link>
          </div>
          <div className="searchBar">
            <form onSubmit={searchVideoHandler}>
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={searchValue}
                onChange={(ev) => {
                  setSearchValue(ev.target.value);
                }}
              ></input>
              <button className="searchBtn">
                <div className="tooltip">
                  <img
                    className="searchIcon"
                    src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png"
                    alt="Searh Button"
                  ></img>
                  <span className="tooltiptext">Search</span>
                </div>
              </button>
            </form>
          </div>
          <div className="profileSection">
            {!authUser ? (
              <Link to="/login" onClick={showModalHandler}>
                <div className="signInBtn">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-6/24/user-circle-512.png"
                    alt="signInPerson"
                  ></img>
                  <button className="signIn">Sign In</button>
                </div>
              </Link>
            ) : (
              <>
                <Link to="/create">
                  <div className="createVideo">
                    <div className="tooltip">
                      <img
                        className="createVideo"
                        src="https://cdn3.iconfinder.com/data/icons/user-interface-733/32/Video-256.png"
                        alt="Create Video"
                      />
                      <span className="tooltiptext">Create</span>
                    </div>
                  </div>
                </Link>

                <div className="profileCircle" onClick={showDropDownMenu}>
                  <img src={authUser.img} alt="Display profile"></img>
                </div>
                {show && (
                  <div
                    className="dropDownMenu"
                    onClick={(ev) => showDropDownMenu(ev, true)}
                  >
                    <ul>
                      <li className="headerSection">
                        <div className="profileCircle2">
                          <img src={authUser.img} alt="Display profile"></img>
                        </div>
                        <h3>{authUser.name}</h3>
                      </li>
                      <div className="navhL"></div>
                      <li>View Profile(Currently Disabled)</li>
                      <div className="navhL"></div>
                      <li className="signOut" onClick={logoutHandler}>
                        Sign out
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
