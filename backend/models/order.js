const mongoose = require("mongoose");
const Joi = require('joi');
const {FoodItems} = require('./foodItem');

const orderSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    fooditems: {
        type: [FoodItems],
    },
    bill: {
        type: Number,
        required: true, // lol we aint fuckin with this 
    },
    status: {
        type: String,
        enum: ['Queued', 'Cooking', 'Ready'],
        required: true,
        lowercase: true,
        trim: true,
    },

});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order){
    const schema = {
        user: Joi.objectId(),
        bill : Joi.number().min(0).required(),
        status: Joi.string().required()
    };

    return Joi.validate(order, schema);
};

exports.Order = Order;
exports.validateOrder = validateOrder;