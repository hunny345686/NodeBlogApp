import "./post.css";
import { Link } from "react-router-dom";

function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img src={PF + post.photo} alt="" className="postImg" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => {
            <spna className="postcat">{c.name}</spna>;
          })}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">
        {post.desc}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quia
        dolorum quasi placeat, blanditiis, maxime expedita minima iusto ratione
        excepturi animi tenetur illum, sapiente dignissimos vero natus veritatis
        dicta corrupti? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Similique quia dolorum quasi placeat, blanditiis, maxime expedita minima
        iusto ratione excepturi animi tenetur illum, sapiente dignissimos vero
        natus veritatis dicta corrupti? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Similique quia dolorum quasi placeat, blanditiis,
        maxime expedita minima iusto ratione excepturi animi tenetur illum,
        sapiente dignissimos vero natus veritatis dicta corrupti?
      </p>
    </div>
  );
}

export default Post;
