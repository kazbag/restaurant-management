import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import LogoutPage from "./pages/LogoutPage";
import Greetings from "./pages/GreetingsPage";
import Secret from "./pages/SecretPage";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import axios from "axios";
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
            <PrivateRoute path="/products" component={ProductsPage} />
            <PrivateRoute path="/logout" component={LogoutPage} />
            <PrivateRoute path="/secret" component={Secret} />
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
