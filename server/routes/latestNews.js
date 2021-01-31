const latestNews = require("express").Router();
const express = require("express");
const router = express.Router();
const LatestNews = require("../models/LatestNews");
const mongoose = require("mongoose");
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
  const _news = await LatestNews.find();
  const newId = Math.max(..._news.map((o) => o.newsId), 0);

  const newNews = new LatestNews({
    title: req.body.title,
    message: req.body.message,
    date: Date.now(),
    newsId: newId + 1,
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

latestNews.get("/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await LatestNews.find({ newsId: newsId });
    if (news.length > 0) {
      return res.status(200).json(news);
    } else {
      return res.status(404).json({ message: "Nie znaleziono newsa." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Coś poszło nie tak." });
  }
});

module.exports = latestNews;
