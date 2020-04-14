import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div className="nav">
          <div className="menu">
            <NavLink exact activeClassName="active" to="/">
              Strona główna
            </NavLink>
            {!isAuthenticated && (
              <NavLink activeClassName="active" to="/login">
                Logowanie
              </NavLink>
            )}
            {!isAuthenticated && (
              <NavLink activeClassName="active" to="/register">
                Rejestracja
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink activeClassName="active" to="/logout">
                Wyloguj
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink activeClassName="active" to="/secret">
                Tajemnica
              </NavLink>
            )}
          </div>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default Navbar;
