import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import List from "../components/List/List";
import Products from "../components/List/Products";
const ProductsPage = () => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div style={{ color: "white", textAlign: "center" }}>
          Lista produktów
          <List>
            <Products />
          </List>
        </div>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(ProductsPage);
