import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  // TODO: menu toggle is not working
  return (
    <AuthContext.Consumer>
      {(context) => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Restauracja
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {isAuthenticated && userRole === "admin" && (
                <>
                  <NavLink className="nav-link" toexact to="/">
                    Strona główna
                  </NavLink>
                  <NavLink className="nav-link" to="/kitchen">
                    Kuchnia
                  </NavLink>
                  <NavLink className="nav-link" to="/codes">
                    Kody
                  </NavLink>
                  <NavLink className="nav-link" to="/menu">
                    Menu
                  </NavLink>
                  <NavLink className="nav-link" to="/admin">
                    Admin
                  </NavLink>
                  <NavLink className="nav-link" to="/logout">
                    Wyloguj
                  </NavLink>
                </>
              )}
              {isAuthenticated && userRole === "employee" && (
                <>
                  <NavLink className="nav-link" exact to="/">
                    Strona główna
                  </NavLink>
                  <NavLink className="nav-link" to="/kitchen">
                    Kuchnia
                  </NavLink>
                  <NavLink className="nav-link" to="/logout">
                    Wyloguj
                  </NavLink>
                </>
              )}
              {isAuthenticated && userRole === "user" && (
                <>
                  <NavLink className="nav-link" exact to="/">
                    Strona główna
                  </NavLink>
                  <NavLink className="nav-link" to="/products">
                    Zamów
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    O Nas
                  </NavLink>
                  <NavLink className="nav-link" to="/gallery">
                    Galeria
                  </NavLink>
                  <NavLink className="nav-link" to="/logout">
                    Wyloguj
                  </NavLink>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <NavLink className="nav-link" exact to="/">
                    Strona główna
                  </NavLink>
                  <NavLink className="nav-link" to="/login">
                    Logowanie
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    O Nas
                  </NavLink>
                  <NavLink className="nav-link" to="/register">
                    Rejestracja
                  </NavLink>
                  <NavLink className="nav-link" to="/gallery">
                    Galeria
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </AuthContext.Consumer>
  );
};

export default Navbar;
