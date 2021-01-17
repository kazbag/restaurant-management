import React, { useEffect, useContext } from 'react';
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
      .then((res) => {
        setAuth(false);
        history.push('/');
      })
      .catch((err) => {
        toast(err.response.data.message, 'error');
      });
  }, [isAuthenticated]);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div>
          <h3 className="logout">Wylogowano</h3>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(LogoutPage);
