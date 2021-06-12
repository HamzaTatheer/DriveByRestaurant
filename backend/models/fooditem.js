const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const foodItemSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category:{
		type: mongoose.Schema.Types.ObjectId,      
		ref: "categorySchema",
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        requried: true,
    }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

function validateFoodItems(category){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        price = Joi.number().min(0).required(),
        category = Joi.objectId(),
        ingredients = Joi.required(),
        description: Joi.string().required(),
    };

    return Joi.validate(category, schema);
};

exports.FoodItem = FoodItem;
exports.validateFoodItems = validateFoodItem;