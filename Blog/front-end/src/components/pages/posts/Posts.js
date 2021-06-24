import "./posts.css";
import Post from "../post/Post";

function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => {
        return (
          <div key={p._id}>
            <Post post={p} />
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
