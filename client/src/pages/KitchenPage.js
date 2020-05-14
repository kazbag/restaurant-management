import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { withRouter } from "react-router-dom";
import {
  StyledContainer,
  StyledBox,
  StyledHeader,
  StyledList,
  StyledListItem,
  StyledListItemLink,
  StyledButton,
  StyledListItemHeader,
  StyledDescription,
  StyledSpan,
} from "../stylesComponents/StyledComponents";
const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const KitchenPage = ({ history }) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [orders, setOrders] = useState([
    {
      id: 1,
      phone: "+48666555444",
      cost: 90,
      products: ["pizza", "kebab", "bigos", "piwo"],
      address: "Kraków, ul. Główna 24/17",
      time: "16:30",
      isCompleted: false,
    },
    {
      id: 2,
      phone: "+48666555444",
      cost: 24,
      products: ["pizza"],
      address: "Kraków, ul. Zimna 223/52b",
      time: "19:30",
      isCompleted: false,
    },
    {
      id: 3,
      phone: "+48555444333",
      cost: 25,
      products: ["pizza", "kebab"],
      address: "Kraków, ul. Gąbki 21/2b",
      time: "17:05",
      isCompleted: true,
    },
    {
      id: 4,
      phone: "+48123456789",
      cost: 22,
      products: ["chaczapuri"],
      address: "Kraków, ul. Brzydka 2b",
      time: "17:26",
      isCompleted: true,
    },
  ]);

  const moveOrder = (e) => {
    const orderId = e.target.getAttribute("order");
    let newOrders = [...orders];
    const myOrder = newOrders.find((order) => order.id.toString() === orderId);
    myOrder.isCompleted = !myOrder.isCompleted;
    setOrders(newOrders);
  };

  const itemsCompleted = orders.map((item) => {
    const { id, phone, cost, products, address, time, isCompleted } = item;
    if (isCompleted) {
      const productsList = products.map((prod) => {
        return (
          <StyledSpan key={(Math.random() * 1000).toString()}>
            {prod},{" "}
          </StyledSpan>
        );
      });
      return (
        <StyledListItem key={(Math.random() * 1000).toString()}>
          <StyledDescription>
            #{id} {cost} zł: {productsList} {address} {time}
          </StyledDescription>
          <StyledListItemHeader>
            <StyledListItemLink href={`tel:${phone}`}>
              Zadzwoń
            </StyledListItemLink>
            <StyledListItemLink target="_blank" href={`/order/${id}`}>
              Pokaż zamówienie
            </StyledListItemLink>
            <StyledButton order={id} onClick={moveOrder}>
              Przywróć
            </StyledButton>
          </StyledListItemHeader>
        </StyledListItem>
      );
    }
  });

  const itemsNotCompleted = orders.map((item) => {
    const { id, phone, cost, products, address, time, isCompleted } = item;
    if (!isCompleted) {
      const productsList = products.map((prod) => {
        return (
          <StyledSpan key={(Math.random() * 1000).toString()}>
            {prod},{" "}
          </StyledSpan>
        );
      });
      return (
        <StyledListItem key={(Math.random() * 1000).toString()}>
          <StyledDescription>
            #{id} {cost} zł: {productsList} {address} {time}
          </StyledDescription>
          <StyledListItemHeader>
            <StyledListItemLink href={`tel:${phone}`}>
              Zadzwoń
            </StyledListItemLink>
            <StyledListItemLink target="_blank" href={`/order/${id}`}>
              Pokaż zamówienie
            </StyledListItemLink>
            <StyledButton order={id} onClick={moveOrder}>
              Archiwizuj
            </StyledButton>
          </StyledListItemHeader>
        </StyledListItem>
      );
    }
  });

  return (
    <AuthContext.Consumer>
      {(context) => (
        <StyledContainer>
          <StyledBox>
            <StyledHeader>Zamówienia do zrealizowania</StyledHeader>
            <StyledList>{itemsNotCompleted}</StyledList>
          </StyledBox>
          <StyledBox>
            <StyledHeader>Zamówienia zrealizowane</StyledHeader>
            <StyledList>{itemsCompleted}</StyledList>
          </StyledBox>
          <StyledBox>e</StyledBox>
          <StyledBox>e</StyledBox>
        </StyledContainer>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(KitchenPage);
