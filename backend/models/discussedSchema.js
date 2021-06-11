const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    phone: {
        type: String,
        required: true,
        max: 11,
        min: 11,
    },
    role: {
        type: Number,
        required: true,
        default: 2, // 2 is for customer, 1 for the cashier and 0 for admin
        max: 2,
        min: 0,
    }
});

const categorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    }
});

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
        type: Category,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        requried: true,
    },
});

const menuSchema = new mongoose.Schema ({
    fooditems: [FoodItem] 
});

const orderSchema = new mongoose.Schema ({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    fooditems: {
        type: [FoodItem],
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

const feedbackSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderSchema',
    },
    message: {
        type: String,
        maxlength: 280, // tweet length
        lowercase: true,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true, // big brainz
    }
});