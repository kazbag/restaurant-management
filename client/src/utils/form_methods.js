import axios from 'axios';
import toast from 'toast-me';

axios.defaults.withCredentials = true;

// TODO: handle it
export const submitOrder = (url, data) => {
  axios
    .post(`${url}/orders`, data)
    // .then((res) => console.log(res))
    .catch((err) => toast(err.response.data.message, 'error'));
};

export const handleRegister = (uri, data, callback) => {
  axios
    .post(`${uri}/users`, data)
    .then(() => {
      // eslint-disable-next-line no-unused-expressions
      callback && callback();
    })
    .catch((err) => {
      toast(err.response.data.message, 'error');
    });
};

export const handleLogin = (url, data, callback) => {
  axios(`${url}/login`, {
    method: 'POST',
    data,
    withCredentials: true,
  })
    .then(() => {
      // eslint-disable-next-line no-unused-expressions
      callback && callback(true);
      window.location.href = '/';
    })
    .catch((err) => {
      toast(err.response.data.message, 'error');
      // eslint-disable-next-line no-unused-expressions
      callback && callback(false);
    });
};

// eslint-disable-next-line no-return-assign
export const redirectToLogin = () => window.location.href = '/login';
// eslint-disable-next-line no-return-assign
export const redirectToHomepage = () => window.location.href = '/';
