const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const {FoodItem, foodItemSchema} = require("../models/fooditem");

router.get("/menu", async(req, res) => {
	try {
		let fooditems = await FoodItem.find({}).sort("name");
		res.send(fooditems);
	}
	catch (ex) {
		console.log(ex.message);
	}
});