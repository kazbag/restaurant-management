import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div className="nav">
          {isAuthenticated && (
            <div className="menu">
              <NavLink exact activeClassName="active" to="/">
                Strona główna
              </NavLink>
              <NavLink activeClassName="active" to="/logout">
                Wyloguj
              </NavLink>
              <NavLink activeClassName="active" to="/products">
                Zamów
              </NavLink>
              <NavLink activeClassName="active" to="/kitchen">
                Kuchnia
              </NavLink>
              <NavLink activeClassName="active" to="/about">
                O Nas
              </NavLink>
            </div>
          )}
          {!isAuthenticated && (
            <div className="menu">
              <NavLink exact activeClassName="active" to="/">
                Strona główna
              </NavLink>
              <NavLink activeClassName="active" to="/login">
                Logowanie
              </NavLink>
              <NavLink activeClassName="active" to="/about">
                O Nas
              </NavLink>
              <NavLink activeClassName="active" to="/register">
                Rejestracja
              </NavLink>
            </div>
          )}
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default Navbar;
