import React, { useEffect } from "react";

const Order = ({ order, handleChange, handleCode, handleSubmit }) => {
  const productsList = order.products.map((product, index) => {
    return <li key={index}>{product}</li>;
  });

  return (
    <div className="card p-4">
      <h3 className="">Twoje zamówienie</h3>
      <ul className="list list-unstyled px-0 mx-0">
        {productsList}
        {order.price > 0 && <span>Koszt całkowity: {order.price} zł</span>}
      </ul>
      <div className="form-group">
        <label>Kod rabatowy</label>
        <input
          className="form-control mr-4"
          type="text"
          disabled={order.code_submitted}
          value={order.code}
          name="code"
          placeholder="Wpisz kod"
          onChange={handleChange}
        />
        <small className="form-text text-muted">
          Jeśli masz kod rabatowy, wprowadź go tutaj.
        </small>
      </div>
      <div className="row mt-4">
        <div className="col">
          <a
            className={`btn btn-primary w-100 ${
              order.code_submitted || order.code === "" ? "disabled" : ""
            }`}
            style={{
              visibility:
                order.code && !order.code_submitted ? "visible" : "hidden",
            }}
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
      {order.error && (
        <div
          className="alert alert-warning alert-dismissible fade mt-4 show"
          role="alert"
        >
          <strong>Nieprawidłowy kod!</strong> Spróbuj ponownie, lub skontaktuj
          się z obsługą.
        </div>
      )}
    </div>
  );
};

export default Order;
