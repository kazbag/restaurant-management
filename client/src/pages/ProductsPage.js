import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import {
  handleAdd,
  handleCode,
  handleSubmit,
  getProducts,
} from "../components/Order/order_utils";
import { useFields, useLoad } from "../utils/hooks";
import { Menu, Order } from "../components/Order/order_components";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const ProductsPage = () => {
  const [products, setProducts] = useLoad([], `${SERVER_URL}/products`);
  const [order, setOrder] = useState({
    products: [],
    code: "",
    code_submitted: false,
    error: false,
    ratio: 1,
  });

  // useEffect(() => {
  //   console.log(order);
  // }, [order, setOrder]);

  const addToOrder = (productId) => {
    const product = products.find((item) => item._id === productId);
    setOrder({ ...order, products: [...order.products, product] });
  };
  const submitCode = () => {
    handleCode(order.code, (codeDetails) =>
      setOrder({ ...order, ...codeDetails })
    );
  };

  window.order = order;

  return (
    <AuthContext.Consumer>
      {(context) => (
        <div className="row d-flex flex-row ">
          <Menu products={products} onClick={addToOrder} />
          <Order
            codeDisabled={order.ratio !== 1}
            order={order}
            onCodeChange={(e) => setOrder({ ...order, code: e.target.value })}
            onCodeSubmit={() => submitCode()}
            onAdd={() => handleSubmit(order)}
            onRemove={(id) =>
              setOrder({
                ...order,
                products: order.products.filter((item, index) => index !== id),
              })
            }
          />
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(ProductsPage);
