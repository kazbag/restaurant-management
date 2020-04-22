import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import "./styles.css";
const GreetingsPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div className="box">
          {isAuthenticated
            ? "witaj zalogowany użytkowniku"
            : "witaj nieznajomy"}
        </div>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(GreetingsPage);
