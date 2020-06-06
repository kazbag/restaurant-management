import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import List from "../components/List/List";
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
    setTotalPrice(parseInt(totalPrice) + parseInt(e.target.value));
    setOrder([...order, e.target.id]);
  };

  return (
    <AuthContext.Consumer>
      {(context) => (
        <List>
          <Products addToOrder={addToOrder} />
          <Order
            clientPrice={clientPrice}
            order={order}
            addDiscountCode={addDiscountCode}
            setDiscountCode={setDiscountCode}
          />
        </List>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(ProductsPage);
