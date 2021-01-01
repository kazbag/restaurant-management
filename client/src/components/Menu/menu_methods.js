import React from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleCreate = (product, callback) => {
  axios
    .post(`${SERVER_URL}/products`, product)
    .then(() => axios.get(`${SERVER_URL}/products`))
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Dodano produkt!"))
    .catch((err) => console.log(err));
};

export const handleEdit = (id, callback) => {};

export const handleRemove = (id, callback) => {
  axios
    .delete(`${SERVER_URL}/products/${id}`)
    .then(() => axios.get(`${SERVER_URL}/products`))
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Usunięto produkt!"))
    .catch((err) => console.log(err));
};
