import React, { useEffect, useState } from "react";
import "./styles.css";
const products = require("../mocks/products");

const Products = ({ totalPrice, addToOrder }) => {
  return (
    <ul className="products-list">
      {products.map((product, id) => {
        return (
          <li className="product-item" key={product.name}>
            <div className="products-container">
              <img
                className="product-image"
                width="50px"
                height="50px"
                src={product.imageUrl}
              />
              {product.name} - {product.price} zł
            </div>
            <button
              className="order-button"
              value={product.price}
              onClick={addToOrder}
              id={product.name}
            >
              Dodaj do koszyka
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Products;
