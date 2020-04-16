import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { withRouter } from "react-router-dom";

const LogoutPage = ({ history }) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  useEffect(() => {
    axios("http://server.localhost/logout", {
      method: "POST",
      withCredentials: true,
    })
      .then((res) => {
        setAuth(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div>
          <h3 style={{ color: "red", textAlign: "center" }}>Wylogowano</h3>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(LogoutPage);
