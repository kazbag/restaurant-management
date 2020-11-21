const latestNews = require("express").Router();

latestNews.get("/", async (req, res) => {
  res.json([
    {
      id: 1,
      title: "Promocja",
      message:
        "Dzisiaj w promocji zupa pomidorowa! Z kodem ZUP_POM dostaniesz 20% rabatu!",
      date: "19.11.2020",
      link: `http://localhost:3000/news/1`,
    },
    {
      id: 2,
      title: "Informacje",
      message:
        "Pandemia pandemią, ale wciąż oferujemy dostawę pysznych, świeżych posiłków!",
      date: "18.11.2020",
      link: `http://localhost:3000/news/2`,
    },
    {
      id: 3,
      title: "Nowy pracownik",
      message:
        "W związku z rozrostem naszej restauracji, zatrudniliśmy nowego kucharza.",
      date: "17.11.2020",
      link: `http://localhost:3000/news/3`,
    },
  ]);
});

module.exports = latestNews;
