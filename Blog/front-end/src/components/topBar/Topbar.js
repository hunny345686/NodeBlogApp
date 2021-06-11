import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const pf = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topleft">
        <i className="topicon fab fa-facebook"></i>
        <i className="topicon fab fa-linkedin"></i>
        <i className="topicon fab fa-github-square"></i>
      </div>
      <div className="topcenter">
        <ul className="toplist">
          <li className="toplistitems">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="toplistitems">
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li className="toplistitems">
            <Link to="/contact" className="link">
              Contact
            </Link>
          </li>
          <li className="toplistitems">
            <Link to="/blog" className="link">
              CreateBlog
            </Link>
          </li>
          <li className="toplistitems" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <Link to="/setting" className="link">
            <img
              className="topimage"
              src={user.profilePic ? pf + user.profilePic : pf + "user.png"}
              alt=""
            />
          </Link>
        ) : (
          <>
            <ul className="toplist">
              <li className="toplistitems">
                <Link to="/login" className="link">
                  Login
                </Link>
              </li>
              <li className="toplistitems">
                <Link to="/register" className="link">
                  Register
                </Link>
              </li>
            </ul>
          </>
        )}

        <i className="topserchicon fas fa-search"></i>
      </div>
    </div>
  );
};

export default Topbar;
