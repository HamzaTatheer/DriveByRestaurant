const mongoose = require("mongoose");
const Joi = require('joi');
const {FoodItems, foodItemSchema} = require('./foodItem');

const orderSchema = new mongoose.Schema({
    user: {
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
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    foodItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'foodItemSchema',
    },
    bill: {
        type: Number,
        required: true, // lol we aint fuckin with this 
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
        //foodItems : Joi.required()
    });

    return schema.validate(order);
};

exports.Order = Order
exports.validateOrder = validateOrder