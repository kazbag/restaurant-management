import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
const Greetings = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div style={{ color: "white", textAlign: "center" }}>
          {isAuthenticated
            ? "witaj zalogowany użytkowniku"
            : "witaj nieznajomy"}
        </div>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(Greetings);
