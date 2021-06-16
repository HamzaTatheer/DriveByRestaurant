const mongoose = require("mongoose");
const Joi = require('joi');
const {FoodItems, foodItemSchema} = require('./fooditem');

const orderSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    user_name:{
        type : String,
        required : true,
        minlength : 4,
        maxlength : 100 
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    fooditems: {
        type: [foodItemSchema],
    },
    bill: {
        type: Number,
        required: true, // lol we aint ******* with this 
    },
    status: {
        type: String,
        enum: ['Queued', 'Cooking', 'Ready'],
        default : 'Queued',
        trim: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order){
    const schema = Joi.object({
        user: Joi.objectId(),
        bill : Joi.number().min(0).required(),
        status: Joi.string(),
        fooditems : Joi.array().items(Joi.objectId()).required()
    });

    return schema.validate(order);
};

exports.Order = Order;
exports.validateOrder = validateOrder;