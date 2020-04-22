import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
const SecretPage = () => {
  return (
    <AuthContext.Consumer>
      {(context) => <div className="box">Dzień dobry</div>}
    </AuthContext.Consumer>
  );
};
export default withRouter(SecretPage);
