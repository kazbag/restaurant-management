import axios from "axios";
import toast from "toast-me";

axios.defaults.withCredentials = true;

// TODO: handle it
export const submitOrder = (url, data) => {
  axios
    .post(`${url}/orders`, data)
    .then((res) => console.log(res))
    .catch((err) => toast(err.message, "error"));
};

export const handleRegister = (uri, data, callback) => {
  axios
    .post(`${uri}/users`, data)
    .then((response) => {
      console.log(response);
      callback && callback();
    })
    .catch((err) => {
      toast(err.message, "error");
    });
};

export const handleLogin = (url, data, callback) => {
  axios(`${url}/login`, {
    method: "POST",
    data: data,
    withCredentials: true,
  })
    .then((response) => {
      callback && callback(true);
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err.response);
      toast(err.response.data.message, "error");
      callback && callback(false);
    });
};

export const redirectToLogin = () => (window.location.href = "/login");
export const redirectToHomepage = () => (window.location.href = "/");
