import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import List from "../components/List/List";
import Products from "../components/List/Products";
import Order from "../components/List/Order";
import discountCodes from "../components/mocks/discountCodes";
import axios from "axios";


const ProductsPage = () => {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const [discountCode, setDiscountCode] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalOrderPrice, setFinalOrderPrice] = useState(0);
  const [isCodeIncluded, setIsCodeIncluded] = useState(false);

  useEffect(() => {

    axios
      .get(`${serverUrl}/discountCodes/:discountCodeId`)
      .then((response) => {
        setProducts(response.data);
      })
    /*
    .catch((err) => {
      console.log(err);
      setError(!isError)
    });
    */
  }, []);


  const addDisscountCode1 = (e) => {
    const code = discountCode;
    if (!code) return console.log("niepoprawny kod")
  }




  const addDiscountCode = (e) => {
    const code = discountCodes.find((_) => _.code === discountCode);
    if (!code) return console.log("niepoprawny kod");
    if (!isCodeIncluded) {
      setTotalPrice(totalPrice - totalPrice * code.amount);
      console.log(totalPrice);
      setIsCodeIncluded(true);
      return;
    }
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
            totalPrice={totalPrice}
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
