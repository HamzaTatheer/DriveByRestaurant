const express = require('express');
const router = express.Router();
const {Category, validateCategory} = require('../models/category');


//Get all Categories
router.get('/', async (req, res) => {

    try 
    {
        const categories = await Category.find()
            .select({ name : 1 })
            .sort({ name: 1 })
            .lean();
    
        console.log(categories);
        res.send(categories);
    } 
    catch (error) {
        res.status(500).send('Connection Error.');
    }
    
});

//Post a Category
router.post('/', async (req, res) => {
    const { error } = validateCategory(req.body);

    if(error)
        return res.status(400).send(error.details[0].message);

    //const index = genres[]["id"];
    const category = new Category ({
        name : req.body.name
    });

    try {
        const result = await category.save();
        console.log(result);
    }
    catch(ex) {
        console.log('Error', ex.message)
    }
    res.send(category);
    
});

module.exports = router;