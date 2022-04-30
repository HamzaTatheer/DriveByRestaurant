const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { FoodItem } = require("../models/fooditem");
const { Order } = require("../models/order");
const { getHighestOrderItem } = require("./supporting_methods/menu");

router.get("/menu", async (req, res) => {
  try {
    let fooditems = await FoodItem.find({}).sort("name");
    res.send(fooditems);
  } catch (ex) {
    console.log(ex.message);
    res.status(400).send("Request Invalid");
  }
});

router.get("/orderOfTheDay", async (req, res) => {
  var start = new Date();
  start.setHours(0, 0, 0, 0);

  var end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    let orders = await Order.find({ date: { $gte: start, $lt: end } }).select(
      "fooditems._id"
    );

    let highestOrderedItem = getHighestOrderItem(orders);
    let foodObject = await FoodItem.find({ _id: highestOrderedItem });

    res.send(foodObject);
  } catch (ex) {
    console.log(ex.message);
  }
});

module.exports = router;
