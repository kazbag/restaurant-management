import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleEdit = (id, data, callback) => {
  axios
    .patch(`${SERVER_URL}/users/${id}`, data)
    .then(() => axios.get(`${SERVER_URL}/users`))
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Zaktualizowano dane użytkownika."))
    .catch((err) => console.log(err));
};

export const handleRemove = (id, callback) => {
  window.swal
    .fire({
      title: "Czy na pewno chcesz usunąć tego użytkownika?",
      text: "Ta zmiana jest nieodwracalna!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, usuń!",
      cancelButtonText: "Nie, zostaw.",
    })
    .then((result) => {
      if (result.value) {
        axios
          .delete(`${SERVER_URL}/users/${id}`)
          .then(() => axios.get(`${SERVER_URL}/users`))
          .then((response) => callback(response.data))
          .catch((err) => console.log(err));
        window.swal.fire("Usunięto!");
      } else if (result.dismiss === window.swal.DismissReason.cancel) {
        window.swal.fire("Anulowano.");
      }
    });
};

export const handleNew = (data, callback) => {
  axios
    .post(`${SERVER_URL}/users`, data)
    .then(() => axios.get(`${SERVER_URL}/users`))
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Dodano użytkownika!"))
    .catch((err) => console.log(err));
};

export const handleCreateMessage = (data, callback) => {
  axios
    .post(`${SERVER_URL}/news`, data)
    .then(() => axios.get(`${SERVER_URL}/news`))
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Dodano nową wiadomość!"))
    .catch((err) => console.log(err));
};

export const handleRemoveMessage = (id, callback) => {
  window.swal
    .fire({
      title: "Czy na pewno chcesz usunąć ten news?",
      text: "Ta zmiana jest nieodwracalna!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, usuń!",
      cancelButtonText: "Nie, zostaw.",
    })
    .then((result) => {
      if (result.value) {
        axios
          .delete(`${SERVER_URL}/news/${id}`)
          .then(() => axios.get(`${SERVER_URL}/news`))
          .then((response) => callback(response.data))
          .catch((err) => console.log(err));
        window.swal.fire("Usunięto!");
      } else if (result.dismiss === window.swal.DismissReason.cancel) {
        window.swal.fire("Anulowano.");
      }
    });
};
