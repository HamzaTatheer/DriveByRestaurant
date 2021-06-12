const mongoose = require("mongoose");
//const Joi = require('joi');
const {FoodItems} = require('./foodItem');

const menuSchema = new mongoose.Schema ({
    fooditems: [FoodItems]
});

const Menu = mongoose.model('Menu', menuSchema);

exports.Menu = Menu