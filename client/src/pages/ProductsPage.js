import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import List from "../components/List/List";
import Products from "../components/List/Products";
import Order from "../components/List/Order";

const ProductsPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const addToOrder = (e) => {
    setTotalPrice(parseInt(totalPrice) + parseInt(e.target.value));
    setOrder([...order, e.target.id]);
  };
  return (
    <AuthContext.Consumer>
      {(context) => (
        <List>
          <Products addToOrder={addToOrder} />
          <Order totalPrice={totalPrice} order={order} />
        </List>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(ProductsPage);
