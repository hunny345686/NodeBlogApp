import { useState, useEffect } from "react";
import "./home.css";
import Header from "../../Header/Header";
import Posts from "../posts/Posts";
import Sidebar from "../../sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router";
import Footer from "../../footer/Footer";

function Home() {
  const [posts, setPost] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fatchPost = async () => {
      const res = await axios.get("/allPost" + search);
      // console.log(res.data);
      setPost(res.data);
    };
    fatchPost();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default Home;
