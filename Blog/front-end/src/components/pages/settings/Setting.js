import "./setting.css";
import Sidebar from "../../sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import axios from "axios";

function Setting() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const pf = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    // console.log(newPost);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      // console.log(newPost);
      // console.log(data);
      try {
        await axios.post("/uploadFile", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.patch("/update/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingPP">
            <img
              src={file ? URL.createObjectURL(file) : pf + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingPPIcon fas fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            //placeholder={user.username}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            // placeholder={user.email}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="*********"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="settingSubmit" type="submit">
            Update
          </button>
          {success && (
            <span className="successMsg">Profile Has Been Updated..</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Setting;
