import Topbar from "./components/topBar/Topbar";
import Home from "./components/pages/home/Home";
import Single from "./components/pages/single/Single";
import Blog from "./components/pages/write/Blog";
import Setting from "./components/pages/settings/Setting";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Home /> : <Login />}
        </Route>
        <Route exact path="/blog">
          {user ? <Blog /> : <Register />}
        </Route>
        <Route exact path="/setting">
          {user ? <Setting /> : <Register />}
        </Route>
        <Route exact path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
