import React, { useEffect, useState } from "react";
import "./styles.css";
const products = [
  {
    id: 1,
    name: "pizza",
    price: 25,
    imageUrl:
      "https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: 2,
    name: "bigos",
    price: 12,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/79/Bigos_in_Krak%C3%B3w_%28Rynek_G%C5%82%C3%B3wny%29.jpg",
  },
  {
    id: 3,
    name: "kebab",
    price: 14,
    imageUrl: "https://live.staticflickr.com/2260/1938150191_4ae8684d1e_z.jpg",
  },
  {
    id: 4,
    name: "frytki",
    price: 8,
    imageUrl:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/06/15/09/chips.jpg?w968h681",
  },
  {
    id: 5,
    name: "kremówka",
    price: 5,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/Krem%C3%B3wka_Wadowicka_-_panoramio.jpg",
  },
  {
    id: 5,
    name: "schabowy",
    price: 15,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kotlet_Schabowy.jpg/640px-Kotlet_Schabowy.jpg",
  },
];

const Products = (props) => {
  return (
    <ul className="products-list">
      {products.map((product, id) => {
        return (
          <>
            <li className="product-item" key={id}>
              <div className="products-container">
                <img
                  className="product-image"
                  width="50px"
                  height="50px"
                  src={product.imageUrl}
                />
                {product.name} - {product.price} zł
              </div>
              <button className="button-add">Dodaj do koszyka</button>
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default Products;
