import axios from "axios";
import _ from "lodash";
import toast from "toast-me";

axios.defaults.withCredentials = true;

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleAdd = (product, products, productsList, callback) => {
  const _product = productsList.find((prod) => prod.name === product);
  callback({ products: [...products, _product] });
};

export const addDiscountCode = (codesList, code, discountAmount) => {
  const discount = codesList.find((item) => item.code === code);
};

// TODO: handle callback for submit order
export const handleSubmit = (data) => {
  axios
    .post(`${SERVER_URL}/orders`, data)
    .then((res) => console.log(res))
    .catch((err) => toast(err.response.data.message, "error"));
};

export const handleCode = (data, callback) => {
  axios
    .get(`${SERVER_URL}/discountCodes/${data}`)
    .then((response) => {
      callback(response.data);
    })
    .catch((err) => toast(err.response.data.message, "error"));
};

export const getProducts = (callback) => {
  axios
    .get(`${SERVER_URL}/products`)
    .then((response) => {
      callback({ products_list: response.data });
    })
    .catch((err) => {
      toast(err.response.data.message, "error");
    });
};
