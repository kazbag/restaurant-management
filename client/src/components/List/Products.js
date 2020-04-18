import React, { useEffect, useState } from "react";
const products = [
  { id: 1, name: "pizza" },
  { id: 2, name: "bigos" },
];

const Products = (props) => {
  return (
    <ul>
      {products.map((product, id) => {
        return <li key={id}>{product.name}</li>;
      })}
    </ul>
  );
};

export default Products;
