import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Products from "../components/List/Products";
import Order from "../components/List/Order";
import axios from "axios";
import Pusher from "pusher-js";

const ProductsPage = () => {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const [discountCode, setDiscountCode] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(1);
  const [pusherLoading, setPusherLoading] = useState(false);
  const [isCodeIncluded, setIsCodeIncluded] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

  const clientPrice = (totalPrice * discountAmount).toFixed(2);

  // pusher
  const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_KEY}`, {
    cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
  });

  const channel = pusher.subscribe("my-channel");
  useEffect(() => {
    channel.bind("inserted", function(data) {
      setPusherLoading(data);
    });
  }, []);
  // end pusher

  useEffect(() => {
    axios.get(`${serverUrl}/discountCodes`).then((response) => {
      setDiscountCodes(response.data);
    });
  }, []);

  const addDiscountCode = (e) => {
    const code = discountCodes.find((_) => _.code === discountCode);

    if (!code) {
      alert("niepoprawny kod");
      return;
    }

    if (!isCodeIncluded) {
      const discount = discountAmount - code.value;
      setDiscountAmount(discount);
      setIsCodeIncluded(true);
      return;
    }
    console.log(discountAmount);
    alert("Wpisałeś już kod!");
  };

  const addToOrder = (e) => {
    const checkThatProductExists = () => {
      const productIndex = order.findIndex((item) =>
        item.includes(e.target.id)
      );
      if (productIndex > -1) {
        const str = order[productIndex];
        let count = str.split(" x ")[1];
        count++;
        order[productIndex] = e.target.id + ` x ${count}`;
      } else {
        setOrder([...order, `${e.target.id} x 1`]);
      }
    };
    checkThatProductExists();
    setTotalPrice(parseInt(totalPrice) + parseInt(e.target.value));
  };

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          <div className="row d-flex">
            <div className="col col-md-7">
              <Products addToOrder={addToOrder} />
            </div>
            <div className="col col-md-5 mt-4 mt-md-0">
              <Order
                clientPrice={clientPrice}
                order={order}
                addDiscountCode={addDiscountCode}
                setDiscountCode={setDiscountCode}
              />
            </div>
          </div>
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(ProductsPage);
