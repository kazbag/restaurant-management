import React, { useEffect, useState } from "react";

const ProductsList = ({ totalPrice, onAdd, products }) => {
  return (
    <div className="card p-4">
      <ul className="list list-unstyled">
        {products.map((product, id) => {
          return (
            <li className="list-item mb-2" key={product.name}>
              <div className="d-flex align-items-center">
                <div className="col d-flex align-items-center">
                  <div>
                    <img
                      className="rounded"
                      width="50px"
                      height="50px"
                      src={product.photo}
                      alt={product.description}
                    />
                  </div>
                  <p className="my-auto ml-5">
                    {product.name} - {product.price} zł
                  </p>
                </div>
                <a
                  className="btn btn-warning"
                  data-value={product.name}
                  onClick={onAdd}
                  id={product.name}
                >
                  Dodaj
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
