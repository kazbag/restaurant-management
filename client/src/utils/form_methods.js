import React, { useEffect, useState } from "react";
import axios from "axios";

export const submitOrder = (url, data) => {
  axios
    .post(`${url}/orders`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const handleRegister = (uri, data, callback) => {
  axios
    .post(`${uri}/register`, data)
    .then((response) => {
      console.log(response);
      callback && callback(true);
    })
    .catch((error) => {
      callback && callback(false);
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
      console.log(err);
      callback && callback(false);
    });
};

export const redirectToLogin = () => (window.location.href = "/login");
export const redirectToHomepage = () => (window.location.href = "/");
