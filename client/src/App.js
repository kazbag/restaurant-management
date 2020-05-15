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
import KitchenPage from "./pages/KitchenPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";

const App = () => {
  return (
    <div className="container">
      <AuthContextProvider>
        <Router>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Greetings} />
              <Route path="/login" component={Form} />
              <Route path="/register" component={Form} />
              <Route path="/about" component={AboutPage} />
              <Route path="/gallery" component={GalleryPage} />
              <PrivateRoute path="/about" component={AboutPage} />
              <PrivateRoute path="/gallery" component={GalleryPage} />
              <PrivateRoute path="/products" component={ProductsPage} />
              <PrivateRoute path="/logout" component={LogoutPage} />
              <PrivateRoute path="/secret" component={Secret} />
              <PrivateRoute path="/kitchen" component={KitchenPage} />
            </Switch>
          </div>
        </Router>
      </AuthContextProvider>
    </div>
  );
};

export default App;
