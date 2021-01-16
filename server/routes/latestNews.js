const latestNews = require("express").Router();
const express = require("express");
const router = express.Router();
const LatestNews = require("../models/LatestNews");
const { getAuth } = require("../SessionService");

// no auth needed
latestNews.get("/", async (req, res) => {
  try {
    const news = await LatestNews.find();
    res.json(news);
  } catch (err) {
    res.json({ message: err });
  }
});

latestNews.post("/", getAuth("admin"), async (req, res) => {
  const newNews = new LatestNews({
    title: req.body.title,
    message: req.body.message,
    date: Date.now(),
    // TODO: auto link generate
  });
  try {
    const savedNewNews = await newNews.save();
    res.json(savedNewNews);
  } catch (err) {
    res.json({ message: err });
  }
});

latestNews.delete("/:newsId", getAuth("admin"), async (req, res) => {
  try {
    const removedNews = await LatestNews.remove({
      _id: req.params.newsId,
    });
    res.json(removedNews);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = latestNews;
