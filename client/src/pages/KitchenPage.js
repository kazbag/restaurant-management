import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {
  Container,
  List,
} from '../components/Kitchen/kitchen_components';
import { useLoad } from '../utils/hooks';
import { handleStatusToggle } from '../components/Kitchen/kitchen_methods';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

// TODO: handle history
// eslint-disable-next-line no-unused-vars
const KitchenPage = ({ history }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // TODO: handle it
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [pendingOrders, setPendingOrders] = useLoad(
    [],
    `${SERVER_URL}/orders/pending`,
  );
  const [completedOrders, setCompletedOrders] = useLoad(
    [],
    `${SERVER_URL}/orders/completed`,
  );

  const handleSubmit = (id) => handleStatusToggle(id, setPendingOrders, setCompletedOrders, () => {
    setIsModalVisible(false);
    window.swal.fire('Zmieniono status zamówienia!');
  });

  return (
    <AuthContext.Consumer>
      {() => (
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

KitchenPage.propTypes = {
  history: PropTypes.any,
};

export default withRouter(KitchenPage);
