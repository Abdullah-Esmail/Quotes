import style from "./Login.module.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { getAuthToken, userSideAuth } from "../../lib/UserSideAuth";

const Login = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  const history = useHistory();

  const formHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const pass = passRef.current.value;
    userSideAuth(email, pass);
    if (getAuthToken()) {
      history.push("/quotes");
      history.go("./");
    }
  };

  return (
    <form className={style.form} onSubmit={formHandler}>
      <div className={style.control}>
        <label htmlFor="user">Username</label>
        <input type="text" id="user" ref={emailRef} />
      </div>
      <div className={style.control}>
        <label htmlFor="pass">Password</label>
        <input id="pass" type={"password"} ref={passRef}></input>
      </div>

      <div className={style.actions}>
        <button className="btn" type={"submit"}>
          Signin
        </button>
      </div>
    </form>
  );
};

export default Login;
