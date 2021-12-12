import { UserProvider } from "./context/index";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Manage from "./components/Manage";
import Debt from "./components/Debt";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/login">
            <ToastContainer position="top-center" />
            <Login />
          </Route>

          <Route exact path="/register">
            <ToastContainer position="top-center" />
            <Register />
          </Route>

          <Route exact path="/">
            <Navbar />
            <ToastContainer position="top-center" />
            <Body />
          </Route>
          
          <Route exact path="/manage">
            <Navbar />
            <ToastContainer position="top-center" />
            <Manage/>
          </Route>

          <Route exact path="/debt">
            <Navbar />
            <ToastContainer position="top-center" />
            <Debt/>
          </Route>

        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
