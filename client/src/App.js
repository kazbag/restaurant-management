import React from "react";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Logout from "./components/Logout";
import Greetings from "./components/Greetings";
import Secret from "./components/Secret";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Greetings} />
            <Route path="/login" component={Form} />
            <Route path="/register" component={Form} />
            <PrivateRoute path="/logout" component={Logout} />
            <PrivateRoute path="/secret" component={Secret} />
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
