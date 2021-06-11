const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model("User", userSchema);

function validateUserLogin(user) {
    const schema = Joi.object({
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(11).max(11).required(),
    });
    return schema.validate(user);
}

function validateUserSignup(user,role) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(11).max(11).required(),
        role: role,
    });
    return schema.validate(user);
}


exports.User = User;
exports.userSchema = userSchema;
exports.validateLogin = validateUserLogin;
exports.validateSignup = validateUserSignup;