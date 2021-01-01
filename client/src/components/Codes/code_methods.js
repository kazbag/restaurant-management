import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleRemove = (id, callback) => {
  axios
    .delete(`${SERVER_URL}/discountCodes/${id}`)
    .then(() => axios.get(`${SERVER_URL}/discountCodes`))
    .then((response) => callback(response.data))
    .catch((err) => console.log(err));
};

export const handleCreate = (code, callback) => {
  axios
    .post(`${SERVER_URL}/discountCodes`, code)
    .then(() => axios.get(`${SERVER_URL}/discountCodes`))
    .then((response) => callback(response.data))
    .catch((err) => console.log(err));
};
