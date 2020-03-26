import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Logout from "./components/Logout";
import Greetings from "./components/Greetings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    axios("http://localhost:3001/check", {
      method: "POST",
      withCredentials: true
    })
      .then(response => {
        setIsLogged(true);
      })
      .catch(err => {
        console.log(err);
        setIsLogged(false);
      });
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Greetings isLogged={isLogged} seti />}
          />
          <Route
            path="/login"
            render={() => (
              <Form isLogged={isLogged} setIsLogged={setIsLogged} />
            )}
          />
          <Route path="/register" component={Form} />
          <Route
            path="/logout"
            render={() => (
              <Logout isLogged={isLogged} setIsLogged={setIsLogged} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
