import React, { useEffect, useState } from "react";
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
        setError(!isError);
      });
  }, []);

  if (products.length > 0) {
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
                      />
                    </div>
                    <p className="my-auto ml-5">
                      {product.name} - {product.price} zł
                    </p>
                  </div>
                  <a
                    className="btn btn-warning"
                    value={product.price}
                    onClick={addToOrder}
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
  } else if (isError) {
    return (
      <div className="alert alert-danger">
        Niestety nie udało się załadować produktów z bazy
      </div>
    );
  } else {
    return (
      <ul>
        <li>wczytuję listę produktów...</li>
      </ul>
    );
  }
};

export default Products;
