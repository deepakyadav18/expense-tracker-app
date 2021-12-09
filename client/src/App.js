import './App.css';
import Body from './components/Body';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
      {/* <Navbar/>
      {/* <Body/> */}
      {/* <Register/> */}
      {/* <Login/>  */}

      <Switch>
        
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/">
          <Navbar />
          <Body />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
