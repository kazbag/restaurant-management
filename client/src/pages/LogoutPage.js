import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import toast from 'toast-me';
import { AuthContext } from '../contexts/AuthContext';

axios.defaults.withCredentials = true;

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const LogoutPage = ({ history }) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  useEffect(() => {
    axios(`${serverUrl}/logout`, {
      method: 'POST',
      withCredentials: true,
    })
      .then(() => {
        setAuth(false);
        history.push('/');
      })
      .catch((err) => {
        toast(err.response.data.message, 'error');
      });
  }, [isAuthenticated]);
  return (
    <AuthContext.Consumer>
      {() => (
        <div>
          <h3 className="logout">Wylogowano</h3>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

LogoutPage.propTypes = {
  history: PropTypes.any,
};

export default withRouter(LogoutPage);
