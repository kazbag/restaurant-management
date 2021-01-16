import axios from "axios";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { redirectToHomepage } from "utils/form_methods";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleRemove = (id, callback) => {
  window.swal
    .fire({
      title: "Czy na pewno chcesz usunąć ten kod?",
      text: "Ta zmiana jest nieodwracalna!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, usuń!",
      cancelButtonText: "Nie, zostaw.",
    })
    .then((result) => {
      if (result.value) {
        axios
          .delete(`${SERVER_URL}/discountCodes/${id}`, {
            withCredentials: true,
          })
          .then(() =>
            axios.get(`${SERVER_URL}/discountCodes`, { withCredentials: true })
          )
          .then((response) => callback(response.data))
          .catch((err) => console.log(err));
        window.swal.fire("Usunięto!");
      } else if (result.dismiss === window.swal.DismissReason.cancel) {
        window.swal.fire("Anulowano.");
      }
    });
};

export const handleCreate = (data, callback) => {
  axios
    .post(`${SERVER_URL}/discountCodes`, { data, withCredentials: true })
    .then(() =>
      axios.get(`${SERVER_URL}/discountCodes`, { withCredentials: true })
    )
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Dodano nowy kod!"))
    .catch((err) => {
      if (err.response) {
        window.swal.fire(
          "podałeś złe dane lub nie wprowadziłeś ich we wszystkich wymaganych polach"
        );
      }
    });
};
