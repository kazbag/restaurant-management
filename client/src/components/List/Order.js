import React, { useEffect, useState } from "react";
import "./styles.css";

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
      <button className="order-button order-button--submit">Zamów</button>
    </div>
  );
};

export default Order;
