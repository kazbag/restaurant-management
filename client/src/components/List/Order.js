import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const Order = ({
  order,
  setOrder,
  addDiscountCode,
  setDiscountCode,
  discountCode,
  clientPrice,
}) => {
  const mockOrder = {
    products: order,
    price: clientPrice,
    orderDate: new Date(),
    paymentStatus: true,
    orderStatus: false,
    // todo get user phone and address
    phone: "222643341",
    address: "ul. Pawia 22/3",
  };

  const submitOrder = () => {
    axios
      .post(`${SERVER_URL}/orders`, mockOrder)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(order);
  }, [order]);
  useEffect(() => {
    // todo check user credentials and create order object
  }, []);
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
