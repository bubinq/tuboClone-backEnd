import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.css";
import { axiosInstance } from "../utils";
import { AuthContext } from "../contexts/authContext";
import { ErrorMessages } from "./ErrorMessage";

export const RegisterModal = ({ showModalHandler, toggle }) => {
  const { setAuthUser } = useContext(AuthContext);
  const [error, setError] = useState({
    message: "",
    triggered: false,
    errorType: "",
  });
  const [isFocused, setFocus] = useState({
    name: false,
    email: false,
    img: false,
    password: false,
    repass: false,
  });
  const navigateTo = useNavigate();

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

  const registerHandler = async (ev) => {
    ev.preventDefault();

    const { name, email, img, password, repass } = Object.fromEntries(
      new FormData(ev.target)
    );
    try {
      const response = await axiosInstance.post(
        "/auth/signup",
        {
          name,
          email,
          img,
          password,
          repass,
        },
        {
          withCredentials: true,
        }
      );
      setAuthUser(response.data);
      navigateTo("/", { replace: true });
    } catch (error) {
      const msg = error.response.data.message;
      setError({ triggered: true, message: msg, errorType: msg.split(" ")[0] });
    }
  };
  useEffect(() => {
    return () => {
      setError({ triggered: false, message: "", errorType: "" });
      setFocus({
        name: false,
        email: false,
        img: false,
        password: false,
        repass: false,
      });
    };
  }, [toggle]);

  if (!toggle) {
    return (
      <>
        <div className="overlay" onClick={showModalHandler}></div>
        <div className="modal-content">
          <h3>Create account</h3>
          <div className="text-wrapper">
            <span>Already have an account?</span>
            <Link to="/login">Sign in</Link>
          </div>
          {error.triggered && <ErrorMessages error={error}></ErrorMessages>}
          <form onSubmit={registerHandler}>
            <div className="email-wrapper">
              <label
                htmlFor="name"
                className={isFocused.name ? "focused" : "labels"}
              >
                Name
              </label>
              <input
                className={error.errorType === "Name" ? "errBorder" : ''}
                type="text"
                name="name"
                id="name"
                onBlur={labelHandler}
                onFocus={labelHandler}
                autoComplete="off"
                required
              />
            </div>
            <div className="email-wrapper">
              <label
                htmlFor="email"
                className={isFocused.email ? "focused" : "labels"}
              >
                Email
              </label>
              <input
                className={error.errorType === "E-mail" ? "errBorder" : ''}
                type="email"
                name="email"
                id="email"
                onBlur={labelHandler}
                onFocus={labelHandler}
                autoComplete="off"
                required
              />
            </div>
            <div className="email-wrapper">
              <label
                htmlFor="img"
                className={isFocused.img ? "focused" : "labels"}
              >
                ImageUrl
              </label>
              <input
                type="text"
                name="img"
                id="img"
                onBlur={labelHandler}
                onFocus={labelHandler}
                autoComplete="off"
                required
              />
            </div>
            <div className="password-wrapper">
              <label
                htmlFor="password"
                className={isFocused.password ? "focused" : "labels"}
              >
                Password
              </label>
              <input
                className={error.errorType === "Your" ? "errBorder" : ''}
                type="password"
                name="password"
                id="password"
                onBlur={labelHandler}
                onFocus={labelHandler}
                required
              />
            </div>

            <div className="password-wrapper">
              <label
                htmlFor="password-confirm"
                className={isFocused.repass ? "focused" : "labels"}
              >
                Confirm Password
              </label>
              <input
                className={error.errorType === "Your" ? "errBorder" : ''}
                type="password"
                name="repass"
                id="password-confirm"
                onBlur={labelHandler}
                onFocus={labelHandler}
                required
              />
            </div>

            <div className="authBtn">
              <button>Register</button>
            </div>
          </form>
          <div className="modal-close">
            <button onClick={showModalHandler}>&#x2716;</button>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
