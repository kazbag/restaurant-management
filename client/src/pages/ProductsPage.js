import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import ProductsList from "../components/Order/ProductsList";
import Order from "../components/Order/Order";
import Pusher from "pusher-js";
import {
  handleAdd,
  handleCode,
  handleSubmit,
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
    price: 0,
  });

  useEffect(() => {
    console.log(fields);
  }, [fields, updateFields]);

  // const [pusherLoading, setPusherLoading] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

  // pusher
  // const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_KEY}`, {
  //   cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
  // });

  // const channel = pusher.subscribe("my-channel");
  // useEffect(() => {
  //   channel.bind("inserted", function(data) {
  //     setPusherLoading(data);
  //   });
  // }, []);
  // end pusher

  // useEffect(() => {
  //   axios.get(`${serverUrl}/discountCodes`).then((response) => {
  //     setDiscountCodes(response.data);
  //   });
  // }, []);

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          <div className="row d-flex">
            <div className="col col-md-7">
              <ProductsList handleClick={handleAdd} />
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
