import Pusher from "pusher-js";
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
import {
  Container,
  Modal,
  List,
} from "../components/Kitchen/kitchen_components";
import Loader from "../components/Loader/Loader";
import { useLoad } from "../utils/hooks";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const KitchenPage = ({ history }) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [pendingOrders] = useLoad([], `${SERVER_URL}/orders/pending`);
  const [completedOrders] = useLoad([], `${SERVER_URL}/orders/completed`);

  useEffect(() => {
    console.log(pendingOrders);
  }, [pendingOrders]);

  useEffect(() => {
    console.log(completedOrders);
  }, [completedOrders]);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <Container>
          <List data={pendingOrders} header="Do realizacji" />
          <List data={completedOrders} header="Zrealizowane" />
        </Container>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(KitchenPage);
