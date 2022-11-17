import { axiosInstance } from "../utils";
import dayjs from "dayjs";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { CommentContext } from "../contexts/commentsContext";
import { useNavigate } from "react-router";
export const Comments = ({ video }) => {
  const [showBtns, setShowBtns] = useState(false);
  const [commentValue, setCommentValue] = useState({
    comment: "",
    activateBtn: false,
  });
  const { authUser } = useContext(AuthContext);
  const { comments, dispatch } = useContext(CommentContext);
  const navigateTo = useNavigate()

  useEffect(() => {
    const loadVideoComments = async () => {
      const response = await axiosInstance.get(`/comment/allcomments/${video._id}`);
      return dispatch({
        type: "READ",
        payload: response.data
      })
    };
    loadVideoComments();
    //eslint-disable-next-line
  }, []);

  const addCommentHandler = async (ev) => {
    ev.preventDefault();
    if (commentValue.comment.trim()) {
      const response = await axiosInstance.post(`/comment/video/${video._id}`, {
        message: commentValue.comment,
      });
      dispatch({
        type: "ADD_COMMENT",
        payload: response.data.saved
      })
      dispatch({
        type: "READ",
        payload: response.data.allComments
      })
      setCommentValue({ comment: "", activateBtn: false });
    }
  };

  const commentFocusHandler = () => {
    if(!authUser) {
      navigateTo('/login', {replace: true})
    }
    setShowBtns(true);
  };

  const inputValueHandler = (ev) => {
    setCommentValue((oldVal) => ({ ...oldVal, comment: ev.target.value }));
    if (ev.target.value.trim()) {
      setCommentValue((oldVal) => ({ ...oldVal, activateBtn: true }));
    } else {
      setCommentValue((oldVal) => ({ ...oldVal, activateBtn: false }));
    }
  };
  return (
    <div className="commentWrapper">
      <div className="commentsCount">
        <span className="count">{comments.length} Comments</span>
      </div>
      <div className="userProfile">
        <img src={authUser?.img || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} alt="User Profile"></img>
        <form onSubmit={addCommentHandler}>
          <input
            type="text"
            className="addComment"
            placeholder="Add a comment..."
            value={commentValue.comment}
            onChange={inputValueHandler}
            onFocus={commentFocusHandler}
          ></input>
          {showBtns && (
            <div className="buttons">
              <button
                className="cancel"
                type="reset"
                onClick={() => {
                  console.log("Zashto");
                  setShowBtns(false);
                  setCommentValue({ comment: "", activateBtn: false });
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={
                  commentValue.activateBtn ? "activeComment" : "comment"
                }
              >
                Comment
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <img src={comment.userId.img} alt="Comment Owner"></img>
            <div className="commentWrap">
              <div className="userAndUploaded">
                <h5>{comment?.userId.name}</h5>
                <span className="commentAgo">
                  {dayjs(comment.createdAt).fromNow()}
                </span>
              </div>
              <span>{comment.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
