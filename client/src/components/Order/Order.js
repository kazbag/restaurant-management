import React from "react";

const Order = ({ order, handleChange, handleCode, handleSubmit }) => {
  return (
    <div className="card p-4">
      <h3 className="">Twoje zamówienie</h3>
      <ul className="list list-unstyled px-0 mx-0">
        {/* {order.map((item, id) => {
          return (
            <li className="list-item" key={id}>
              {item}
            </li>
          );
        })} */}
        {order.price && <span>Koszt całkowity: {order.price} zł</span>}
      </ul>
      <input
        className="form-control mr-4"
        type="text"
        disabled={order.code_submitted}
        value={order.code}
        name="code"
        placeholder="kod rabatowy"
        onChange={handleChange}
      />
      <div className="row mt-4">
        <div className="col">
          <a
            className={`btn btn-primary w-100 ${
              order.code_submitted || order.code === "" ? "disabled" : ""
            }`}
            onClick={handleCode}
          >
            Dodaj kod
          </a>
        </div>
        <div className="col">
          <a className="btn btn-success w-100" onClick={handleSubmit}>
            Zamów
          </a>
        </div>
      </div>
    </div>
  );
};

export default Order;
