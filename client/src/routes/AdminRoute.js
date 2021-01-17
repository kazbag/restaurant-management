import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminRoute = ({ component: Component, authed, ...rest }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  return (
    <AuthContext.Consumer>
      {() => (
        <Route
          {...rest}
          render={(props) => (isAuthenticated === true && userRole === 'admin' ? (
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

AdminRoute.propTypes = {
  component: PropTypes.any,
  authed: PropTypes.any,
};

export default AdminRoute;
