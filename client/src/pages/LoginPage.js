/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useFields } from "../utils/hooks";
import { handleRegister, handleLogin } from "../utils/form_methods";

const AccountForm = ({ handleChange, handleRegister, handleLogin, fields }) => {
  return (
    <form className="d-flex align-items-center flex-column form">
      <div className="p-5 bg-white rounded">
        <div className="form-group">
          <label>Login</label>
          <input
            className="form-control"
            type="text"
            placeholder="login"
            name="login"
            onChange={handleChange}
          />
          <small className="form-text text-muted">Wprowadź swój login</small>
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
          <small className="form-text text-muted">Wprowadź hasło</small>
        </div>

        {window.location.pathname === "/register" && (
          <>
            <div className="form-group">
              <label>Imię</label>
              <input
                className="form-control"
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
              />
              <small className="form-text text-muted">Wprowadź swoje imię</small>
            </div>

            <div className="form-group">
              <label>Nazwisko</label>
              <input
                className="form-control"
                type="text"
                placeholder="surname"
                name="surname"
                onChange={handleChange}
              />
              <small className="form-text text-muted">Wprowadź swoje nazwisko</small>
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input
                className="form-control"
                type="text"
                placeholder="Jan.Kowalski@gmail.com"
                name="email"
                onChange={handleChange}
              />
              <small className="form-text text-muted">Wprowadź swój e-mail</small>
            </div>

            <div className="form-group">
              <label>Adres</label>
              <input
                className="form-control"
                type="text"
                placeholder="ul. Wielicka 23/2"
                name="address"
                onChange={handleChange}
              />
              <small className="form-text text-muted">Wprowadź swój adres</small>
            </div>

            <div className="form-group">
              <label>Miasto</label>
              <input
                className="form-control"
                type="text"
                placeholder="Kraków"
                name="city"
                onChange={handleChange}
              />
              <small className="form-text text-muted">Wprowadź swoje miasto</small>
            </div>
          </>
        )}

        {window.location.pathname === "/login" && (
          <a className="btn btn-primary px-5 w-100" onClick={handleLogin}>
            Zaloguj się
          </a>
        )}
        {window.location.pathname === "/register" && (
          <a className="btn btn-primary px-5 w-100" onClick={handleRegister}>
            Zarejestruj się
          </a>
        )}
      </div>
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
      <h3 className="text-center mb-4 text-white">
        {window.location.pathname === "/login" ? "Logowanie" : "Rejestracja"}
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
