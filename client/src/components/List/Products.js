import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";



const Products = ({ totalPrice, addToOrder }) => {
  const [products, setProducts] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

  useEffect(() => {
    axios
      .get(`${serverUrl}/products`)
      .then((response) => setProducts(response.data));
  }, []);

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
                src={product.photo}
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
