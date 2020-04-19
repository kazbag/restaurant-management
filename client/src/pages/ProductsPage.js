import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import List from "../components/List/List";
import Products from "../components/List/Products";
import Order from "../components/List/Order";
const ProductsPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState(0);
  const setNewOrderValue = (e) => {
    setTotalPrice(parseInt(totalPrice) + parseInt(e.target.value));
  };
  return (
    <AuthContext.Consumer>
      {(context) => (
        <List>
          <Products
            totalPrice={totalPrice}
            setNewOrderValue={setNewOrderValue}
          />
          <Order totalPrice={totalPrice} setNewOrderValue={setNewOrderValue} />
        </List>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(ProductsPage);
