import React from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const handleAdd = (product, updateList) => {
  updateList(product);
};

export const addDiscountCode = (codesList, code, discountAmount) => {
  const discount = codesList.find((item) => item.code === code);

  //   if (!code) {
  //     alert("niepoprawny kod");
  //     return;
  //   }

  //   if (!isCodeIncluded) {
  //     const discount = discountAmount - code.value;
  //     setDiscountAmount(discount);
  //     setIsCodeIncluded(true);
  //     return;
  //   }
  //   console.log(discountAmount);
  //   alert("Wpisałeś już kod!");
};

export const handleSubmit = (order) => {
  axios
    .post(`${SERVER_URL}/orders`, order)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const handleCode = (code, callback) => {
  axios
    .get(`${SERVER_URL}/discountCodes/${code}`)
    .then((response) => {
      callback(response.data);
    })
    .catch((err) => console.log(err.message));
};

// const mockOrder = {
//     products: order,
//     price: 123,
//     orderDate: new Date(),
//     paymentStatus: true,
//     orderStatus: false,
//     // todo get user phone and address
//     phone: "222643341",
//     address: "ul. Pawia 22/3",
//   };
