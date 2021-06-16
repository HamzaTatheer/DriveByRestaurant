const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require('../middleware/auth');
const { User, validateLogin, validateSignup } = require("../models/user");

router.post("/login", async(req, res) => {
    try {

        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error);
    
        let user = await User.findOne({phone: req.body.phone});
        if (!user) return res.status(400).send("Invalid phone number");

        validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid phone number or password");

        const token = user.generateAuthToken();
        user = _.pick(user,["_id", "avatar" ,"name", "role"]);
        res.send({user, access_token:token}); 
        
        // all these parameters are needed. do not change them.  token will be sent later for validation
    }
    catch(ex) {
        console.log(ex.message);
    }
});

//show all foods
router.get("/getAllFoodItems", auth, async(req, res) => {
    try {

        FoodItem.find().then(doc => doc ? res.send(doc) : res.status(400).send("Food Item not found")).catch((err)=>res.status(500).send());

    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});
//change profile details
router.post('/changePassword', auth, async(req, res) => {
    try 
    {
        let user = await User.findOne({_id : req.user._id})
            .select('name phone avatar role password')
            .lean();

        if(!user) return res.status(400).send('User incorrect');


        if(req.body.newPassword !== req.body.confirmPassword) return res.status(300).send('New Passwords donot match...');

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPassword, salt);
        console.log(user);

        const newUser = await User.findByIdAndUpdate(user._id, { password : user.password},{ new : true });

        res.send(newUser);
        //const token = user.generateAuthToken();
        //res.header("access_token", token).send(_.pick(newUser,["name", "_id", "role", "avatar"]));
        } 
    catch (ex) 
    {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

//change profile details
router.post('/changeUserName', auth, async(req, res) => {
    try 
    {
        let user = await User.findOne({_id : req.user._id})
            .select('id is required')
            .lean();

        if(!user) return res.status(400).send('User incorrect');


        const newUser = await User.findByIdAndUpdate(user._id, { name : req.body.name},{ new : true });

        res.send(newUser);
        //const token = user.generateAuthToken();
        //res.header("access_token", token).send(_.pick(newUser,["name", "_id", "role", "avatar"]));
        } 
    catch (ex) 
    {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

//get User details by id. Besides password ofcourse
router.get('/userDetails', async(req, res) => {
    try 
    {
        const user = await User.findById(req.body._id)
            .select('-password')
            .lean();

        if(!user) return res.status(400).send('User not found at this id...');

        res.send(user);
        } 
    catch (ex) 
    {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
})

//get all food categories
router.get("/getAllCategories", auth, async(req, res) => {
    try {
        await Category.find().then(doc => doc ? res.send(doc) : res.status(400).send("Category not found")).catch((err)=>res.status(500).send());
    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

module.exports = router;