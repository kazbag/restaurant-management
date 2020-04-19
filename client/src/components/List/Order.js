import React, { useEffect, useState } from "react";
import "./styles.css";

const Order = ({ totalPrice, setNewOrderValue, order, setOrder }) => {
  useEffect(() => {
    console.log(order);
  }, [order]);
  return (
    <div className="order">
      <h3>Twoje zamówienie</h3>
      <ul className="order-list">
        {order.map((item, id) => {
          return <li key={Math.random().toString()}>{item}</li>;
        })}
        <li>Koszt całkowity: {totalPrice} zł</li>
      </ul>
      <div className="code">
        <input className="code-input" type="text" placeholder="kod rabatowy" />
        <button className="order-button">Dodaj kod</button>
      </div>
      <button className="order-button order-button--submit">Zamów</button>
    </div>
  );
};

export default Order;
