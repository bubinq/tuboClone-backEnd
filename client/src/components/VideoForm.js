import { axiosInstance } from "../utils";
import { useState } from "react";
import { useNavigate } from "react-router";
export const VideoForm = () => {
  const navigateTo = useNavigate()
  const [isFocused, setFocus] = useState({
    title: false,
    imgUrl: false,
    desc: false,
    videoUrl: false,
    tags: false,
  });
  const labelHandler = (ev) => {
    let input = ev.target;
    if (input.value.trim()) {
      setFocus((oldFocus) => ({ ...oldFocus, [input.name]: true }));
      return;
    }
    setFocus((oldFocus) => ({
      ...oldFocus,
      [input.name]: !isFocused[`${input.name}`],
    }));
  };
  const createVideo = async (ev) => {
    ev.preventDefault();
    const { title, imgUrl, desc, videoUrl, tags } = Object.fromEntries(
      new FormData(ev.target)
    );
    try {
        const response = await axiosInstance.post("/video/create", {
            title,
            imgUrl,
            desc,
            videoUrl,
            tags: tags.split(', ')
        }, {
          withCredentials: true
        })
        navigateTo('/')
        console.log(response);
    } catch (error) {
        alert(error.message)
    }
  };
  return (
    <div className="modal-content">
      <h3>Create Video</h3>

      <form onSubmit={createVideo}>
        <div className="email-wrapper">
          <label
            htmlFor="title"
            className={isFocused.title ? "focused" : "labels"}
          >
            Video Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onBlur={labelHandler}
            onFocus={labelHandler}
            autoComplete="off"
            required
          />
        </div>
        <div className="email-wrapper">
          <label
            htmlFor="imgUrl"
            className={isFocused.imgUrl ? "focused" : "labels"}
          >
            Image Url
          </label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            onBlur={labelHandler}
            onFocus={labelHandler}
            autoComplete="off"
            required
          />
        </div>
        <div className="email-wrapper">
          <label
            htmlFor="desc"
            className={isFocused.desc ? "focused" : "labels"}
          >
            Video Description
          </label>
          <input
            type="text"
            name="desc"
            id="desc"
            onBlur={labelHandler}
            onFocus={labelHandler}
            autoComplete="off"
            required
          />
        </div>
        <div className="password-wrapper">
          <label
            htmlFor="videoUrl"
            className={isFocused.videoUrl ? "focused" : "labels"}
          >
            Video Url
          </label>
          <input
            type="text"
            name="videoUrl"
            id="videoUrl"
            onBlur={labelHandler}
            onFocus={labelHandler}
            required
          />
        </div>

        <div className="password-wrapper">
          <label
            htmlFor="tags"
            className={isFocused.tags ? "focused" : "labels"}
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Please separate tags with comma"
            onBlur={labelHandler}
            onFocus={labelHandler}
            required
          />
        </div>

        <div className="authBtn">
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};
