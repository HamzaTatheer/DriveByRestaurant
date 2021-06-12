const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const auth = require('../middleware/auth');
const { User, validateSignup } = require("../models/user");
const {FoodItem} = require('../models/fooditem');
const {Category, validateCategory} = require('../models/category');
const {Order, validateOrder} = require('../models/order');
const { Feedback, validateFeedback } = require("../models/feedback");
const upload = require("../middleware/multer")("public/uploads/profile_pictures/");

//Signup
router.post("/signup",upload.single('avatar'), async(req, res) => {
    try {

        const { error } = validateSignup(req.body);//2 is customer role 
        if (error) { return res.status(400).send(error.details[0].message); }

        let user = await User.findOne({phone: req.body.phone});
        if (user) { return res.status(400).send("Customer is already registered"); }

        let user_data = _.pick(req.body, ["name", "password", "phone"]);
        user_data.avatar = req.file ? req.file.filename : null;
        user_data.role = 2;
        user = new User(user_data);
      
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header("access_token", token).send(_.pick(user,["name", "_id", "role", "avatar"]));
    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

//orderFood
router.post("/orderFood", auth, async(req, res) => {
    try {

        if(req.user.role != 2) return res.status(403).send("no privelage to access resource");

        const { error } = validateOrder(req.body);//2 is customer role 
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findById(req.body.user);
        if(!user)  return res.status(400).send("No customer with this ID.");

        const order = new Order ({
            user : {
                _id : user._id,
                name: user.name
            },
            bill : req.body.bill,
            //fooditems : req.body.fooditems
        }); 

        for (let index = 0; index < req.body.fooditems.length; index++) {
            let food = await FoodItem.findById(req.body.fooditems[index]);
                if (!food)  return res.status(400).send("No food item with this ID.");
                console.log(food);
            order.fooditems.push(food);
            element = req.body.fooditems[index];
        }

        await order.save();

        res.send(order);
    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});
//getFoodOfTheDay


//view active order details
router.get("/activeOrders", auth, async(req, res) => {
    try {

        let currentUser = await User.findOne({phone: req.body.phone});
        if (!currentUser) { return res.status(400).send("Customer does not exist"); }

        console.log(currentUser._id);

        const orders = await Order.find({ user: {_id: currentUser._id, name: currentUser.name}, status : ["Queued", "Cooking"] })
            .sort({ date : 1 })
            .lean();
    
        console.log(orders);
        res.send(orders);
    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

//view my order history
router.get("/orderHistory", auth, async(req, res) => {
    try {

        let currentUser = await User.findOne({phone: req.body.phone});
        if (!currentUser) { return res.status(400).send("Customer does not exist"); }

        console.log(currentUser._id);

        const orders = await Order.find({ user: {_id: currentUser._id, name: currentUser.name} })
            .sort({ date : 1 })
            .lean();
    
        console.log(orders);
        res.send(orders);
    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

//Post Feedback
router.post('/giveFeedback', auth, async(req, res) => {

    try 
    {
        let user = await User.findOne({ _id : req.user._id });
        if (!user) return res.status(400).send("Customer does not exist"); 

        let order = await Order.findById({ _id : req.body.order });
        if(!order) return res.status(400).send("Order not found...");

        if(order.status !== "Ready") return res.send("Order not Completed Yet...");

        const feedback = new Feedback({
            user : user._id,
            order : order._id,
            message : req.body.message,
            rating : req.body.rating
        });

        await feedback.save();

        res.send(feedback);
    } 
    catch (ex) 
    {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

module.exports = router;
