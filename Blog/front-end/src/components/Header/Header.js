import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <span className="headerTitleSm">Web Development</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80"
        alt=""
        className="headerImg"
      />
    </div>
  );
}

export default Header;
