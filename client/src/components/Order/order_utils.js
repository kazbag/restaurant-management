import React from "react";
import axios from "axios";
import _ from "lodash";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleAdd = (product, products, productsList, callback) => {
  const _product = productsList.find((prod) => prod.name === product);
  callback({ products: [...products, _product] });
};

export const addDiscountCode = (codesList, code, discountAmount) => {
  const discount = codesList.find((item) => item.code === code);
};

export const handleSubmit = (data) => {
  axios
    .post(`${SERVER_URL}/orders`, { data, withCredentials: true })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const handleCode = (data, callback) => {
  axios
    .get(`${SERVER_URL}/discountCodes/${data}`, { withCredentials: true })
    .then((response) => {
      callback(response.data);
    })
    .catch((err) => console.log(err.message));
};

export const getProducts = (callback) => {
  axios
    .get(`${SERVER_URL}/products`, { withCredentials: true })
    .then((response) => {
      callback({ products_list: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
