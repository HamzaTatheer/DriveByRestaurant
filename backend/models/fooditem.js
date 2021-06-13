const mongoose = require("mongoose");
const Joi = require('joi');

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
        type: new mongoose.Schema({
            name : {
                type : String,
                required : true,
                minlength : 4,
                maxlength : 100 
            },
        }),
        required: true
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        requried: true,
    },
    avatar:{
        type: String,
        required: false
    },
});

const FoodItem = mongoose.model('Fooditems', foodItemSchema);

function validateFoodItems(category){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        price : Joi.number().min(0).required(),
        category : Joi.objectId(),
        ingredients : Joi.required(),
        description : Joi.string().required(),
    });

    return schema.validate(category);
};

exports.FoodItem = FoodItem;
exports.foodItemSchema = foodItemSchema;
exports.validateFoodItems = validateFoodItems;