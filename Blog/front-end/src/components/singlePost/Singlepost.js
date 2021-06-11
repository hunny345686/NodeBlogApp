import "./singlepost.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

function Singlepost() {
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdatemode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/singlePost/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/deletePost/${post._id}`, {
        data: { username: user.username },
      });

      setUpdatemode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`/updatePost/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="siglepostimg" />
        )}
        {updatemode ? (
          <input
            type="text"
            value={title}
            className="singlePsotTitleInput"
            autofocus="true"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePsotTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="siglePostEdit">
                <i
                  className="SiglePostIcon fas fa-edit"
                  onClick={() => {
                    setUpdatemode(true);
                  }}
                ></i>
                <i
                  className="SiglePostIcon fas fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="siglePostInfo">
          <span className="SiglePostAuther">
            <Link to={`/?user=${post.username}`} className="link">
              Author:- <strong>{post.username}</strong>
            </Link>
          </span>
          <span className="SiglePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updatemode ? (
          <textarea
            value={desc}
            className="SiglePostDescriptionInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="SiglePostDescription">{post.desc}</p>
        )}
        {updatemode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update..
          </button>
        )}
      </div>
    </div>
  );
}

export default Singlepost;
