import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  console.log(window.location);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div className="nav">
          {/* zalogowany admin */}
          {isAuthenticated && userRole === "admin" && (
            <div className="menu">
              <NavLink exact activeClassName="active" to="/">
                Strona główna
              </NavLink>
              <NavLink activeClassName="active" to="/kitchen">
                Kuchnia
              </NavLink>
              <NavLink activeClassName="active" to="/codes">
                Kody
              </NavLink>
              <NavLink activeClassName="active" to="/menu">
                Menu
              </NavLink>
              <NavLink activeClassName="active" to="/admin">
                Admin
              </NavLink>
              <NavLink activeClassName="active" to="/logout">
                Wyloguj
              </NavLink>
            </div>
          )}
          {/* zalogowany admin */}
          {isAuthenticated && userRole === "employee" && (
            <div className="menu">
              <NavLink exact activeClassName="active" to="/">
                Strona główna
              </NavLink>
              <NavLink activeClassName="active" to="/kitchen">
                Kuchnia
              </NavLink>
              <NavLink activeClassName="active" to="/logout">
                Wyloguj
              </NavLink>
            </div>
          )}
          {/* zalogowany user */}
          {isAuthenticated && userRole === "user" && (
            <div className="menu">
              <NavLink exact activeClassName="active" to="/">
                Strona główna
              </NavLink>
              <NavLink activeClassName="active" to="/products">
                Zamów
              </NavLink>
              <NavLink activeClassName="active" to="/about">
                O Nas
              </NavLink>
              <NavLink activeClassName="active" to="/gallery">
                Galeria
              </NavLink>
              <NavLink activeClassName="active" to="/logout">
                Wyloguj
              </NavLink>
            </div>
          )}
          {/* niezalogowany user */}
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
              <NavLink activeClassName="active" to="/gallery">
                Galeria
              </NavLink>
            </div>
          )}
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default Navbar;
