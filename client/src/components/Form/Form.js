/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import "./Form.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const Form = ({ history, location }) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});

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

  const handleInputChange = (e) =>
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const registerHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${serverUrl}/register`, data)
      .then((response) => {
        console.log(response);
        setMessage("Stworzono konto");
        setIsRegistered(true);
      })
      .catch((error) => {
        setMessage(error.response.data);
        setIsRegistered(false);
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axios(`${serverUrl}/login`, {
      method: "POST",
      data: data,
      withCredentials: true,
    })
      .then((response) => {
        setAuth(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      });
  };

  return (
    <>
      <h3 className="title" style={{ color: "white" }}>
        {location.pathname === "/login" ? "Logowanie" : "Rejestracja"}
      </h3>
      <form
        onSubmit={
          location.pathname === "/login" ? loginHandler : registerHandler
        }
      >
        <input
          type="text"
          placeholder="login"
          name="name"
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="password"
          placeholder="hasło"
          name="password"
          onChange={handleInputChange}
          className="input"
        />
        <div className="buttons">
          <button type="submit" className="button">
            {location.pathname === "/login" ? "zaloguj" : "zarejestruj"}
          </button>
        </div>
      </form>
      <h3 style={{ textAlign: "center", color: "green" }}>{message}</h3>
    </>
  );
};

export default withRouter(Form);
