/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useFields } from "../utils/hooks";
import { handleRegister, handleLogin } from "../utils/form_methods";

const AccountForm = ({ handleChange, handleRegister, handleLogin, fields }) => {
  return (
    <form className="d-flex align-items-center flex-column form">
      <div className="form-group">
        <label>Login</label>
        <input
          className="form-control"
          type="text"
          placeholder="login"
          name="name"
          onChange={handleChange}
        />
        <span className="form-text text-muted">Wprowadź swój login</span>
      </div>
      <div className="form-group">
        <label>Hasło</label>
        <input
          className="form-control"
          type="password"
          placeholder="hasło"
          name="password"
          onChange={handleChange}
        />
        <span className="form-text text-muted">Wprowadź hasło</span>
      </div>
      {window.location.pathname === "/login" && (
        <a className="btn btn-primary px-8" onClick={handleLogin}>
          Zaloguj się
        </a>
      )}
      {window.location.pathname === "/register" && (
        <a className="btn btn-primary px-8" onClick={handleRegister}>
          Zarejestruj się
        </a>
      )}
    </form>
  );
};

const LoginPage = ({ history, location }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [fields, setField] = useFields({});

  useEffect(() => {
    if (isRegistered) {
      history.push("/login");
    }
  }, [isRegistered]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <h3 className="text-center mb-4">
        {window.location.href === "/login" ? "Logowanie" : "Rejestracja"}
      </h3>
      <AccountForm
        handleChange={setField}
        handleLogin={() => handleLogin(serverUrl, fields, () => setAuth())}
        handleRegister={() =>
          handleRegister(serverUrl, fields, () => setIsRegistered(true))
        }
        fields={fields}
      />
    </div>
  );
};

export default withRouter(LoginPage);
