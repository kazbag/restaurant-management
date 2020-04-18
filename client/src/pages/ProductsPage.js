import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import List from "../components/List/List";
import Products from "../components/List/Products";
import Order from "../components/List/Order";
const ProductsPage = () => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <List>
          <Products />
          <Order />
        </List>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(ProductsPage);
