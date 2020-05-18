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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedItemsValue, setCompletedItemsValue] = useState(0);
  const [notCompletedItemsValue, setNotCompletedItemsValue] = useState(0);

  useEffect(() => {
    axios
      .get(`${serverUrl}/orders`)
      .then((response) => setOrders(response.data))
      .then(() => setLoading(false));
  }, []);

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

  const showCompletedItems = () => {
    const completedItems = orders.filter((item) => item.isCompleted === true);
    const costsArray = [];
    completedItems.forEach((item) => costsArray.push(item.cost));
    const totalCost = costsArray.reduce((a, b) => a + b, 0);
    setCompletedItemsValue(totalCost);
  };

  const showNotCompletedItems = () => {
    const notCompletedItems = orders.filter(
      (item) => item.isCompleted === false
    );
    const costsArray = [];
    notCompletedItems.forEach((item) => costsArray.push(item.cost));
    const totalCost = costsArray.reduce((a, b) => a + b, 0);
    setNotCompletedItemsValue(totalCost);
  };

  useEffect(() => {
    showCompletedItems();
    showNotCompletedItems();
  }, [orders]);

  return (
    <AuthContext.Consumer>
      {(context) => (
        <StyledContainer>
          <StyledBox>
            <StyledHeader>Zamówienia do zrealizowania</StyledHeader>
            <StyledList>
              {loading ? <div>ładowanie danych...</div> : itemsNotCompleted}
            </StyledList>
          </StyledBox>
          <StyledBox>
            <StyledHeader>Zamówienia zrealizowane</StyledHeader>
            <StyledList>
              {loading ? <div>ładowanie danych...</div> : itemsCompleted}
            </StyledList>
          </StyledBox>
          <StyledBox>{notCompletedItemsValue} zł</StyledBox>
          <StyledBox>{completedItemsValue} zł</StyledBox>
        </StyledContainer>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(KitchenPage);
