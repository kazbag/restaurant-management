import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";



const Products = ({ totalPrice, addToOrder }) => {
  const [products, setProducts] = useState([]);
  const [isError, setError] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

  useEffect(() => {

    axios
      .get(`${serverUrl}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(!isError)
      });
  }, []);
  if (products.length > 0) {

    return (
      <ul className="products-list">
        {products.map((product) => {
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
  }
  else if (isError) {
    return <div>Niestety nie udało się załadować produktów z bazy</div>
  }
  else {
    return (
      <ul className="products-list">
        <li>wczytuję listę produktów...</li>
      </ul>
    );
  }


};

export default Products;
