import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            isAuthenticated === true ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
      )}
    </AuthContext.Consumer>
  );
};

export default PrivateRoute;
