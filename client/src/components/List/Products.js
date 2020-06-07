import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

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
      <StyledProductList>
        {products.map((product, id) => {
          return (
            <StyledProductListItem key={product.name}>
              <StyledProductsContainer>
                <StyledProductImage
                  width="50px"
                  height="50px"
                  src={product.photo}
                />
                {product.name} - {product.price} zł
              </StyledProductsContainer>
              <StyledOrderButton
                value={product.price}
                onClick={addToOrder}
                id={product.name}
              >
                Dodaj do koszyka
              </StyledOrderButton>
            </StyledProductListItem>
          );
        })}
      </StyledProductList>
    );
  } else if (isError) {
    return (
      <StyledError>
        Niestety nie udało się załadować produktów z bazy
      </StyledError>
    );
  } else {
    return (
      <StyledProductList>
        <StyledProductListItem>
          wczytuję listę produktów...
        </StyledProductListItem>
      </StyledProductList>
    );
  }
};

const StyledProductList = styled.ul``;
const StyledProductListItem = styled.li``;
const StyledProductsContainer = styled.div``;
const StyledProductImage = styled.img``;
const StyledOrderButton = styled.button``;
const StyledError = styled.div;

export default Products;
