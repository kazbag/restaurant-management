import React, { useEffect, useState } from "react";
// import "./styles.css";
import axios from "axios";
import styled, { css } from "styled-components";
import variables from "../../variables/variables";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const Order = ({
  order,
  setOrder,
  addDiscountCode,
  setDiscountCode,
  discountCode,
  clientPrice,
}) => {
  const mockOrder = {
    products: order,
    price: clientPrice,
    orderDate: new Date(),
    paymentStatus: true,
    orderStatus: false,
    // todo get user phone and address
    phone: "222643341",
    address: "ul. Pawia 22/3",
  };

  const submitOrder = () => {
    axios
      .post(`${SERVER_URL}/orders`, mockOrder)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  useEffect(() => {
    // todo check user credentials and create order object
  }, []);

  return (
    <StyledOrderCointainer>
      <StyledTitle>Twoje zamówienie</StyledTitle>
      <StyledOrderList>
        {order.map((item, id) => {
          return <StyledOrderItem key={id}>{item}</StyledOrderItem>;
        })}
        <StyledOrderItem>Koszt całkowity: {clientPrice} zł</StyledOrderItem>
      </StyledOrderList>
      <StyledDiscountCodeContainer>
        <StyledInput
          placeholder="kod rabatowy"
          onChange={(e) => {
            setDiscountCode(e.target.value);
          }}
        />
        <StyledButton small onClick={addDiscountCode}>
          Dodaj kod
        </StyledButton>
      </StyledDiscountCodeContainer>
      <StyledButton submit onClick={submitOrder}>
        Zamów
      </StyledButton>
    </StyledOrderCointainer>
  );
};
const StyledOrderCointainer = styled.div`
  display: grid;
  grid-template-rows: repeat(12, 1fr);
`;
const StyledOrderList = styled.ul`
  grid-row: 2/9;
  list-style: none;
  border: 1px solid ${variables.blackColor};
  padding: 0.5rem;
`;
const StyledOrderItem = styled.li`
  &:last-child {
    background: ${variables.whiteColor};
  }
`;
const StyledTitle = styled.h3`
  grid-row: 1/1;
`;
const StyledDiscountCodeContainer = styled.div`
  grid-row: 10/10;
`;
const StyledInput = styled.input`
  padding: 0.3rem 0.9rem;
  margin-right: 1rem;
`;
const StyledButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid ${variables.primaryColor};
  ${({ small }) =>
    small &&
    css`
      grid-column: 2/3;
      padding: 0.3rem 0.9rem;
    `}
  ${({ submit }) =>
    submit &&
    css`
      grid-row: 12/12;
      background: ${variables.primaryColor};
      font-size: 1.5rem;
      border-radius: 0.3rem;
      text-transform: uppercase;
      transition: 0.2s;
      &:hover {
        border: 1px solid ${variables.primaryColor};
        background-color: ${variables.whiteColor};
        cursor: pointer;
      }
    `}
`;

export default Order;
