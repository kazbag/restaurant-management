import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import variables from "../../variables/variables";
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
              <StyledProductContainer>
                <StyledProductImage
                  width="50px"
                  height="50px"
                  src={product.photo}
                />
                <StyledProductDescription>
                  {product.name} - {product.price} zł
                </StyledProductDescription>
                <StyledOrderButton
                  value={product.price}
                  onClick={addToOrder}
                  id={product.name}
                >
                  Dodaj
                </StyledOrderButton>
              </StyledProductContainer>
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

const StyledProductList = styled.ul`
  list-style: none;
  display: grid;
  grid-row-gap: 1rem;
`;
const StyledProductListItem = styled.li``;
const StyledProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr;
`;
const StyledProductImage = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;
const StyledOrderButton = styled.button`
  align-self: center;
  padding: 0.5rem 1.5rem;
  transition: 0.25s ease-in-out;
  &:hover {
    background-color: ${variables.primaryColor};
    cursor: pointer;
    border: 1px solid ${variables.blackColor};
  }
  @media screen and (max-width: ${variables.smallScreen}) {
    font-size: 1rem;
  }
`;
const StyledError = styled.div;
const StyledProductDescription = styled.h6`
  font-size: 1rem;
  font-weight: normal;
  align-self: center;
`;

export default Products;
