const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const {FoodItem} = require("../models/fooditem");
const {Order} = require("../models/order");

router.get("/menu", async(req, res) => {
	try {
		let fooditems = await FoodItem.find({}).sort("name");
		res.send(fooditems);
	}
	catch (ex) {
		console.log(ex.message);
	}
});

router.get("/orderOfTheDay", async(req, res) => {

	var start = new Date();
	start.setHours(0,0,0,0);

	var end = new Date();
	end.setHours(23,59,59,999);

	try {
		let orders = await Order.find({date: {$gte: start, $lt: end}}).select("fooditems.name");

		items = [];
		orders.map(elem => {
		let food_items = elem.fooditems;
			food_items.map(item => {
				items.push(item.name);
			});
		});
		items.sort();

		let count = {};
		items.forEach(function(i) { 
			count[i] = (count[i]||0) + 1;
		});
		
		let highestOrderedItem = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
		let foodObject = await FoodItem.find({name: highestOrderedItem});

		res.send(foodObject);
	} 
	catch (ex) {
		console.log(ex.message);
	}
});

module.exports = router;