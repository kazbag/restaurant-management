import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const mockOrder = {
  products: ["pizza"],
  price: 155,
  orderDate: "2012-12-11T23:00:00.000Z",
  paymentStatus: true,
  orderStatus: true,
  phone: "222643341",
  address: "ul. Pawia 22/3",
};

const submitOrder = () => {
  axios
    .post(`${SERVER_URL}/orders`, mockOrder)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const Order = ({
  order,
  setOrder,
  addDiscountCode,
  setDiscountCode,
  discountCode,
  clientPrice,
}) => {
  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="order">
      <h3 className="title">Twoje zamówienie</h3>
      <ul className="order-list">
        {order.map((item, id) => {
          return <li key={Math.random().toString()}>{item}</li>;
        })}
        <li>Koszt całkowity: {clientPrice} zł</li>
      </ul>
      <div className="code">
        <input
          className="code-input"
          type="text"
          placeholder="kod rabatowy"
          onChange={(e) => {
            setDiscountCode(e.target.value);
          }}
        />
        <button className="order-button" onClick={addDiscountCode}>
          Dodaj kod
        </button>
      </div>
      <button
        onClick={submitOrder}
        className="order-button order-button--submit"
      >
        Zamów
      </button>
    </div>
  );
};

export default Order;
