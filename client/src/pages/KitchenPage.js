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
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersCompleted, setOrdersCompleted] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [completedItemsValue, setCompletedItemsValue] = useState(0);
  const [notCompletedItemsValue, setNotCompletedItemsValue] = useState(0);

  const togglePending = (_id) => {
    axios
      .patch(`${serverUrl}/orders/status/${_id}`)
      .then(() => setLoading(true))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  const getCompletedOrders = () => {
    axios
      .get(`${serverUrl}/orders/completed`)
      .then((response) => {
        setOrdersCompleted(response.data);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getPendingOrders = () => {
    axios
      .get(`${serverUrl}/orders/pending`)
      .then((response) => {
        setOrdersPending(response.data);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCompletedOrders();
    getPendingOrders();
  }, [isLoading]);

  const itemsNotCompleted = ordersPending.map((item, index) => {
    const { _id, phone, price, products, address, time, isCompleted } = item;
    const productsList = products.map((prod, index) => {
      return <StyledSpan key={index}>{prod}, </StyledSpan>;
    });
    return (
      <StyledListItem key={(Math.random() * 1000).toString()}>
        <StyledDescription>
          #{index + 1} {price} zł: {productsList} {address} {time}
        </StyledDescription>
        <StyledListItemHeader>
          <StyledListItemLink href={`tel:${phone}`}>Zadzwoń</StyledListItemLink>
          <StyledListItemLink target="_blank" href={`/order/${_id}`}>
            Pokaż zamówienie
          </StyledListItemLink>
          <StyledButton order={_id} onClick={() => togglePending(_id)}>
            Archiwizuj
          </StyledButton>
        </StyledListItemHeader>
      </StyledListItem>
    );
  });

  const itemsCompleted = ordersCompleted.map((item, index) => {
    const { _id, phone, price, products, address, time, isCompleted } = item;
    const productsList = products.map((prod, index) => {
      return <StyledSpan key={index}>{prod}, </StyledSpan>;
    });
    return (
      <StyledListItem key={(Math.random() * 1000).toString()}>
        <StyledDescription>
          #{index + 1} {price} zł: {productsList} {address} {time}
        </StyledDescription>
        <StyledListItemHeader>
          <StyledListItemLink href={`tel:${phone}`}>Zadzwoń</StyledListItemLink>
          <StyledListItemLink target="_blank" href={`/order/${_id}`}>
            Pokaż zamówienie
          </StyledListItemLink>
          <StyledButton order={_id} onClick={() => togglePending(_id)}>
            Przywróć
          </StyledButton>
        </StyledListItemHeader>
      </StyledListItem>
    );
  });

  return (
    <AuthContext.Consumer>
      {(context) => (
        <StyledContainer>
          <StyledBox>
            <StyledHeader>Zamówienia do zrealizowania</StyledHeader>
            <StyledList>
              {isLoading ? <li>ładowanie danych...</li> : itemsNotCompleted}
            </StyledList>
          </StyledBox>
          <StyledBox>
            <StyledHeader>Zamówienia zrealizowane</StyledHeader>
            <StyledList>
              {isLoading ? <li>ładowanie danych...</li> : itemsCompleted}
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
