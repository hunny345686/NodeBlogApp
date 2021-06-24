import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/allCate/");
      setCat(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItems">
        <span className="sidebarTitle">About me</span>
        <img
          src="https://images.pexels.com/photos/1486902/pexels-photo-1486902.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil,
          voluptate inventore, odio Lorem ipsum dolor sit amet
        </p>
      </div>
      <div className="sidebarItems">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebaarList">
          {cat.map((c) => {
            return (
              <div key={c._id}>
                <Link to={`/?cat=${c.name}`} className="link">
                  <li className="sidebarlistItems">{c.name}</li>;
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="sidebarItems">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarsocial">
          <i className="sidebarIcon fab fa-facebook"></i>
          <i className="sidebarIcon fab fa-linkedin"></i>
          <i className="sidebarIcon fab fa-github-square"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
