import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import ProductsList from "../components/Order/ProductsList";
import Order from "../components/Order/Order";
import {
  handleAdd,
  handleCode,
  handleSubmit,
  getProducts,
} from "../components/Order/order_utils";
import { useFields } from "../utils/hooks";

const ProductsPage = () => {
  const [fields, setField, setValues, updateFields] = useFields({
    // discount code
    code: "",
    // if submitted and passed through, set to true and update ratio
    code_submitted: false,
    // array of products in user basket
    products: [],
    // price * ratio = final price, just for user information, api doesn't give a f
    ratio: 1,
    // is any error
    error: false,
    // products list from API
    products_list: [],
  });

  useEffect(() => {
    getProducts(updateFields);
  }, []);

  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          <div className="row d-flex">
            <div className="col col-md-7">
              <ProductsList
                products={fields.products_list}
                handleAdd={(e) => {
                  handleAdd(
                    e.target.dataset.value,
                    fields.products,
                    fields.products_list,
                    updateFields
                  );
                }}
              />
            </div>
            <div className="col col-md-5 mt-4 mt-md-0">
              <Order
                order={fields}
                handleChange={setField}
                handleCode={() => handleCode(fields.code, updateFields)}
                handleSubmit={() => handleSubmit(fields)}
              />
            </div>
          </div>
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(ProductsPage);
