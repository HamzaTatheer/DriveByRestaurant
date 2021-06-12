const mongoose = require("mongoose");
const Joi = require('joi');

const categorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    }
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
    });

    return schema.validate(category);
};

exports.Category = Category
exports.validateCategory = validateCategory