import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  // TODO: menu toggle is not working
  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav">
                {isAuthenticated && userRole === "admin" && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" toexact to="/">
                        Strona główna
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/kitchen">
                        Kuchnia
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/codes">
                        Kody
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/menu">
                        Menu
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin">
                        Admin
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/logout">
                        Wyloguj
                      </NavLink>
                    </li>
                  </>
                )}
                {isAuthenticated && userRole === "employee" && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" exact to="/">
                        Strona główna
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/kitchen">
                        Kuchnia
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/logout">
                        Wyloguj
                      </NavLink>
                    </li>
                  </>
                )}

                {isAuthenticated && userRole === "user" && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" exact to="/">
                        Strona główna
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/products">
                        Zamów
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">
                        O Nas
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/gallery">
                        Galeria
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/logout">
                        Wyloguj
                      </NavLink>
                    </li>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" exact to="/">
                        Strona główna
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Logowanie
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">
                        O Nas
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Rejestracja
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/gallery">
                        Galeria
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default Navbar;
