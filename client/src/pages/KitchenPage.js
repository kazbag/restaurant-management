import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withRouter } from "react-router-dom";
import {
  Container,
  Modal,
  List,
} from "../components/Kitchen/kitchen_components";
import { useLoad } from "../utils/hooks";
import { handleStatusToggle } from "../components/Kitchen/kitchen_utils";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const KitchenPage = ({ history }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [pendingOrders, setPendingOrders] = useLoad(
    [],
    `${SERVER_URL}/orders/pending`
  );
  const [completedOrders, setCompletedOrders] = useLoad(
    [],
    `${SERVER_URL}/orders/completed`
  );

  const handleSubmit = (id) =>
    handleStatusToggle(id, setPendingOrders, setCompletedOrders, () => {
      setIsModalVisible(false);
      window.swal.fire("Zmieniono status zamówienia!");
    });

  return (
    <AuthContext.Consumer>
      {(context) => (
        <Container>
          <List
            isModalVisible={isModalVisible}
            onSubmit={handleSubmit}
            setIsModalVisible={setIsModalVisible}
            data={pendingOrders}
            header="Do realizacji"
          />
          <List
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            onSubmit={handleSubmit}
            data={completedOrders}
            header="Zrealizowane"
          />
        </Container>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(KitchenPage);
