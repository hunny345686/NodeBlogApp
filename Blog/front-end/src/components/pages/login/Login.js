import "./login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Context } from "../../../context/Context";
import axios from "axios";
import { useContext } from "react";
function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="">UserName</label>
        <input type="text" placeholder="UserName......" ref={userRef} />
        <label htmlFor="">Password</label>
        <input type="password" placeholder="*********" ref={passwordRef} />
        <button className="loginButton" type="submit" desabled={isFetching}>
          Login
        </button>
      </form>
      <button className="registerButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}

export default Login;
