import Sidebar from "../../sidebar/Sidebar";
import "./single.css";
import Singlepost from "../../singlePost/Singlepost";

function Single() {
  return (
    <div className="single">
      <Singlepost />
      <Sidebar />
    </div>
  );
}

export default Single;
