import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Order = ({
  order, handleChange, handleCode, handleSubmit,
}) => {
  const productPrice = order.products.reduce((a, b) => +a + +b.price, 0);

  const getProductAmount = (name) => order.products.filter((i) => i.name === name).length;

  const uniqueProducts = _(order.products)
    .groupBy('name')
    .map((g, name) => ({ name, price: _.sumBy(g, 'price') }))
    .value();

  const productsList = uniqueProducts.map((product, index) => (
    <li key={product._id} data-id={`product_${index}`}>
      {product.name}
      {' '}
      {product.price}
      {' '}
      zł
      {' '}
      {getProductAmount(product.name) > 1
        ? `${getProductAmount(product.name)}szt`
        : ''}
    </li>
  ));

  return (
    <div className="card p-4">
      <h3 className="">Twoje zamówienie</h3>
      <ul className="list list-unstyled px-0 mx-0">
        {productsList}
        {productPrice > 0 && !order.code_submitted && (
          <span>
            Koszt całkowity:
            {productPrice}
            {' '}
            zł
          </span>
        )}
        {productPrice > 0 && order.code_submitted && (
          <span>
            koszt całkowity
            {' '}
            <s>
              {productPrice.toFixed(2)}
              {' '}
              zł
              {' '}
            </s>
            {' '}
            {(productPrice * order.ratio).toFixed(2)}
            {' '}
            zł
            {' '}
          </span>
        )}
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
          <button
            type="button"
            className={`btn btn-primary w-100 ${
              order.code_submitted || order.code === '' ? 'disabled' : ''
            }`}
            style={{
              visibility:
                order.code && !order.code_submitted ? 'visible' : 'hidden',
            }}
            onClick={handleCode}
          >
            Dodaj kod
          </button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-success w-100" onClick={handleSubmit}>
            Zamów
          </button>
        </div>
      </div>

      {order.error && (
        <div
          className="alert alert-warning alert-dismissible fade mt-4 show"
          role="alert"
        >
          <strong>Nieprawidłowy kod!</strong>
          {' '}
          Spróbuj ponownie, lub skontaktuj
          się z obsługą.
        </div>
      )}
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleCode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Order;
