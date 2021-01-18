import React from 'react';
import PropTypes from 'prop-types';

export const Menu = ({ products, onClick }) => (
  <div className="col-12 col-md-6 col-lg-8">
    <div className="card">
      <div className="card-body">
        <ul className="list">
          {products.map((product) => (
            <li
              key={product.name}
              className="list-item d-flex align-items-center mb-4"
            >
              <img
                className="mr-4"
                style={{ width: '50px', height: '50px' }}
                src={product.photo}
                alt={product.name}
              />
              <span className="text-muted">{product.name}</span>
              <button
                type="button"
                onClick={() => onClick(product._id)}
                className="btn btn-info ml-auto"
              >
                Dodaj
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

Menu.propTypes = {
  products: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

export const Order = ({
  order,
  onRemove,
  onCodeSubmit,
  onCodeChange,
  codeDisabled,
  onAdd,
  submitDisabled,
}) => {
  const orderAmount = (
    order.products.reduce((a, b) => +a + +b.price, 0) * order.ratio
  ).toFixed(2);
  return (
    <div className="col-12 col-md-6 col-lg-4 mt-4 mt-md-0">
      <div className="card">
        <div className="card-body">
          <h3 className="h3">Twoje zamówienie</h3>
          {order.products.length === 0 && (
            <p className="text-muted">Brak produktów, dodaj coś :)</p>
          )}
          {order.products.length > 0 && (
            <ul className="list-unstyled">
              {order.products.map((product, index) => (
                <li
                  className="list-item d-flex mb-2 align-items-center"
                  key={product}
                >
                  <span>{product.name}</span>
                  <button
                    type="button"
                    data-id={index}
                    className="btn btn-sm btn-outline-danger ml-auto font-weight-bold cursor-pointer"
                    onClick={() => onRemove(index)}
                  >
                    usuń
                  </button>
                </li>
              ))}
              {order.products.length && (
                <li className="list-item text-success mt-8 font-weight-bold">
                  Cena:
                  {' '}
                  {orderAmount}
                  {' '}
                  zł
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control "
                placeholder="wpisz kod"
                onChange={onCodeChange}
                disabled={codeDisabled}
              />
            </div>
            {order.error && (
              <div className="col-12 mt-4">
                <div className="alert alert-danger">
                  <p>
                    Niepoprawny kod, spróbuj ponownie
                    {' '}
                    <br />
                    {' '}
                    lub skontaktuj się
                    z obsługą.
                  </p>
                </div>
              </div>
            )}
            <div className="col-12">
              <div className="d-flex mt-4">
                <button
                  className={`btn btn-primary mr-2 ${
                    codeDisabled ? 'disabled' : ''
                  }`}
                  type="button"
                  onClick={codeDisabled ? undefined : () => onCodeSubmit()}
                >
                  Dodaj kod
                </button>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={submitDisabled ? undefined : onAdd}
                >
                  Złóż zamówienie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.any,
  onRemove: PropTypes.func.isRequired,
  onCodeSubmit: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  codeDisabled: PropTypes.any,
  onAdd: PropTypes.func.isRequired,
  submitDisabled: PropTypes.any,
};
