import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import variables from "../variables/variables";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const MenuPage = ({ history }) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    axios
      .get(`${serverUrl}/products`, setLoading(true))
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);
  const mappedProducts = products.map((product, index) => {
    return (
      <StyledProductListItem key={index}>
        <StyledProductImage src={product.photo} />#{index} {product.id},{" "}
        {product.name} - {product.price} zł{" "}
        <StyledButton save>Edytuj</StyledButton>{" "}
        <StyledButton remove>Usuń</StyledButton>
      </StyledProductListItem>
    );
  });

  return (
    <AuthContext.Consumer>
      {(context) => (
        <StyledContainer>
          <StyledTitle>Strona menu</StyledTitle>
          <StyledProductList>
            {loading ? (
              <StyledProductListItem>Loading...</StyledProductListItem>
            ) : (
              mappedProducts
            )}
          </StyledProductList>
        </StyledContainer>
      )}
    </AuthContext.Consumer>
  );
};

const StyledContainer = styled.div`
  max-width: 75%;
  margin: 0 auto;
  color: ${variables.whiteColor};
`;

const StyledTitle = styled.h3`
  text-align: center;
`;

const StyledProductList = styled.ul`
  list-style: none;
  line-height: 1.7;
`;
const StyledProductListItem = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr 1fr;
`;
const StyledProductImage = styled.img`
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;
const StyledButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  text-align: center;
  border: 1px solid ${variables.blackColor};
  transition: 0.25s;
  &:hover {
    cursor: pointer;
    background: none;
  }
  ${({ remove }) =>
    remove &&
    css`
      background-color: red;
      color: ${variables.whiteColor};
      border-color: red;
      &:hover {
      }
    `}
  ${({ save }) =>
    save &&
    css`
      background-color: ${variables.primaryColor};
      &:hover {
        border-color: ${variables.primaryColor};
        color: ${variables.whiteColor};
      }
    `}
`;
export default withRouter(MenuPage);
