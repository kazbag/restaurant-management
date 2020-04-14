import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { withRouter } from "react-router-dom";

const Logout = (props) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  useEffect(() => {
    axios("http://server.localhost/logout", {
      method: "POST",
      withCredentials: true,
    })
      .then((res) => {
        props.history.push("/");
        console.log(props);
        setAuth(false);
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

export default withRouter(Logout);
