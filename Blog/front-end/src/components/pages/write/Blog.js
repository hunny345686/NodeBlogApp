import "./blog.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../context/Context";

function Blog() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    // console.log(newPost);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      // console.log(newPost);
      // console.log(data);
      try {
        await axios.post("/uploadFile", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/createPost", newPost);
      window.location.replace(`/post/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="blog">
      {file ? (
        <img className="blogImg" src={URL.createObjectURL(file)} alt="" />
      ) : (
        <img
          className="blogImg"
          src="https://images.unsplash.com/photo-1579488381077-d3e6251776d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          alt=""
        />
      )}

      <form
        className="blogForm"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className="blogFormGroup">
          <label htmlFor="fileInput">
            <i className="blogIcon fas fa-plus-square"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <input
            type="text"
            id="fileInput"
            placeholder="Title..."
            className="writeInput"
            autofocus="true"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
            minLength="6"
            maxLength="150"
          />
        </div>
        <div className="blogFormGroup">
          <textarea
            placeholder="Your Blog..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            minLength="100"
            maxLength="5000"
            required
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Blog;
