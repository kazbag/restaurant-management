import axios from "axios";
import toast from "toast-me";

axios.defaults.withCredentials = true;

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleStatusToggle = (
  orderId,
  setPendingOrders,
  setCompletedOrders,
  message
) => {
  axios
    .patch(`${SERVER_URL}/orders/status/${orderId}`)
    .then(() => axios.get(`${SERVER_URL}/orders/pending`))
    .then((response) => setPendingOrders(response.data))
    .then(() => axios.get(`${SERVER_URL}/orders/completed`))
    .then((response) => setCompletedOrders(response.data))
    .then(() => message())
    .catch((err) => toast(err.response.data.message, "error"));
};
