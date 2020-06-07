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
      <StyledButton onClick={submitOrder}>Zamów</StyledButton>
    </StyledOrderCointainer>
  );
};
const StyledOrderCointainer = styled.div``;
const StyledOrderList = styled.ul``;
const StyledOrderItem = styled.li``;
const StyledTitle = styled.h3``;
const StyledDiscountCodeContainer = styled.div``;
const StyledInput = styled.input``;
const StyledButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid ${variables.primaryColor};
  ${({ small }) =>
    small &&
    css`
      padding: 0.3rem 0.9rem;
    `}
`;

export default Order;
