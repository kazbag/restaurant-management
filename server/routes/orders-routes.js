const orders = require("express").Router();

orders.get("/orders", async (req, res) => {
  res.json([
    {
      id: 1,
      phone: "+48666555444",
      cost: 90,
      products: ["pizza", "kebab", "bigos", "piwo"],
      address: "Kraków, ul. Główna 24/17",
      time: "16:30",
      isCompleted: false,
    },
    {
      id: 2,
      phone: "+48666555444",
      cost: 24,
      products: ["pizza"],
      address: "Kraków, ul. Zimna 223/52b",
      time: "19:30",
      isCompleted: false,
    },
    {
      id: 3,
      phone: "+48555444333",
      cost: 25,
      products: ["pizza", "kebab"],
      address: "Kraków, ul. Gąbki 21/2b",
      time: "17:05",
      isCompleted: true,
    },
    {
      id: 4,
      phone: "+48123456789",
      cost: 22,
      products: ["chaczapuri"],
      address: "Kraków, ul. Brzydka 2b",
      time: "17:26",
      isCompleted: true,
    },
  ]);
});

module.exports = orders;
