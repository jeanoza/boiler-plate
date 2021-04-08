import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LadingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NavBar from "./components/views/NavBar/NavBar";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/Auth";
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
      </Switch>
    </Router>
  );
}

export default App;
