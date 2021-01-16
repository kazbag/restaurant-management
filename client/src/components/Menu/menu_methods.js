import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleCreate = (data, callback) => {
  axios
    .post(`${SERVER_URL}/products`, { data, withCredentials: true })
    .then(() => axios.get(`${SERVER_URL}/products`, { withCredentials: true }))
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Dodano produkt!"))
    .catch((err) => console.log(err));
};

export const handleEdit = (id, data, callback) => {
  axios
    .patch(`${SERVER_URL}/products/${id}`, { data, withCredentials: true })
    .then(() => axios.get(`${SERVER_URL}/products`, { withCredentials: true }))
    .then((response) => callback(response.data))
    .then(() => window.swal.fire("Edytowano produkt."))
    .catch((err) => console.log(err));
};

export const handleRemove = (id, callback) => {
  window.swal
    .fire({
      title: "Czy na pewno chcesz usunąć ten produkt?",
      text: "Ta zmiana jest nieodwracalna!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, usuń!",
      cancelButtonText: "Nie, zostaw.",
    })
    .then((result) => {
      if (result.value) {
        axios
          .delete(`${SERVER_URL}/products/${id}`, { withCredentials: true })
          .then(() =>
            axios.get(`${SERVER_URL}/products`, { withCredentials: true })
          )
          .then((response) => callback(response.data))
          .catch((err) => console.log(err));
        window.swal.fire("Usunięto!");
      } else if (result.dismiss === window.swal.DismissReason.cancel) {
        window.swal.fire("Anulowano.");
      }
    });
};
