import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = props => {
  const { isLogged, setIsLogged } = props;
  // console.log(props);
  // useEffect(() => {}, [isLogged]);
  return (
    <div className="nav">
      <div className="menu">
        <NavLink exact activeClassName="active" to="/">
          Strona główna
        </NavLink>
        {!isLogged && (
          <NavLink activeClassName="active" to="/login">
            Logowanie
          </NavLink>
        )}
        {!isLogged && (
          <NavLink activeClassName="active" to="/register">
            Rejestracja
          </NavLink>
        )}
        {isLogged && (
          <NavLink activeClassName="active" to="/logout">
            Wyloguj
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
