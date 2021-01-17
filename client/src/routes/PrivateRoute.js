import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthContext.Consumer>
      {() => (
        <Route
          {...rest}
          render={(props) => (isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              // eslint-disable-next-line react/prop-types
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          ))}
        />
      )}
    </AuthContext.Consumer>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  authed: PropTypes.any,
};

export default PrivateRoute;
