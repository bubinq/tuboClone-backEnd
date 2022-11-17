import { Link } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

export const VideoCard = ({ video, users }) => {
  const currUser = users.find((user) => user._id === video.ownerId);
  //eslint-disable-next-line
  const [moreThanWeek, setMoreThanWeek] = useState(() => {
    const timeCreated = dayjs(video?.createdAt);
    const diff = dayjs(new Date()).diff(timeCreated, "day");
    if (diff >= 7) {
      return true;
    } else {
      return false;
    }
  });
  return (
    <div className="cardWrapper">
      <Link to={`/watch/${video._id}`}>
        <img className="cardImg" src={video.imgUrl} alt={video.title}></img>
        <div className="videoDescription">
          <div className="creatorChannel">
            <img src={currUser.img} alt="Display profile"></img>
          </div>
          <div className="videoInfo">
            <h4>{video.title}</h4>
            <div className="channelViews">
              <span>{currUser ? currUser.name : "Nothing, Sorry Mate"}</span>
              <span>
                {video.views} views •{" "}
                {moreThanWeek
                  ? dayjs(video.createdAt).format("MMM DD, YYYY")
                  : dayjs(video.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
