import React, { useEffect, useState } from "react";
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
    <div className="card p-4">
      <h3 className="">Twoje zamówienie</h3>
      <ul className="list list-unstyled px-0 mx-0">
        {order.map((item, id) => {
          return (
            <li className="list-item" key={id}>
              {item}
            </li>
          );
        })}
        <span>Koszt całkowity: {clientPrice} zł</span>
      </ul>
      <input
        className="form-control mr-4"
        type="text"
        placeholder="kod rabatowy"
        onChange={(e) => {
          setDiscountCode(e.target.value);
        }}
      />
      <div className="row mt-4">
        <div className="col">
          <a
            className="btn btn-primary w-100"
            onClick={() => addDiscountCode()}
          >
            Dodaj kod
          </a>
        </div>
        <div className="col">
          <a className="btn btn-success w-100" onClick={() => submitOrder()}>
            Zamów
          </a>
        </div>
      </div>
    </div>
  );
};

export default Order;
