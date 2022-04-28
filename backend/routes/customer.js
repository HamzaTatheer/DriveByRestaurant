const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { getBill } = require("./supporting_methods/customer");

const auth = require("../middleware/auth");
const { User, validateSignup } = require("../models/user");
const { FoodItem, foodItemSchema } = require("../models/fooditem");
const { Category, validateCategory } = require("../models/category");
const { Order, validateOrder } = require("../models/order");
const { Feedback, validateFeedback } = require("../models/feedback");
const { Types } = require("mongoose");
const upload = require("../middleware/multer")(
  "public/uploads/profile_pictures/"
);

//Signup
router.post("/signup", upload.single("avatar"), async (req, res) => {
  try {
    const { error } = validateSignup(req.body); //2 is customer role
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ phone: req.body.phone });
    if (user) {
      return res.status(400).send("Customer is already registered");
    }

    let user_data = _.pick(req.body, ["name", "password", "phone"]);
    user_data.avatar = req.file ? req.file.filename : null;
    user_data.role = 2;
    user = new User(user_data);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("access_token", token)
      .send(_.pick(user, ["name", "_id", "role", "avatar"]));
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//orderFood
router.post("/orderFood", auth, async (req, res) => {
  try {
    console.log(req.body);

    if (req.user.role != 2)
      return res.status(403).send("no privelage to access resource");

    //const { error } = validateOrder(req.body);//2 is customer role
    //if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res.status(400).send("No customer with this ID.");
    }

    console.log(user);

    //first check if order does not already exist
    let all_user_orders = await Order.find({
      user_id: user._id,
      status: ["Queued", "Cooking"],
    });
    if (all_user_orders.length > 0) {
      console.log("ALready Active Order");
      return res.status(400).send("You already have a active order");
    }
    //-------------------------------------------------------
    //input is fooditems [{id,quantity}]
    //convert id to objs

    let user_order = req.body;

    let food_items = [];
    for (let i = 0; i < user_order.length; i++) {
      let item = await FoodItem.findOne({ _id: Types.ObjectId(user_order[i]) });
      food_items[i] = item;
    }

    food_items = food_items.filter((val) => val != null);
    //order_items now contains all food items in the order now

    if (food_items.length !== user_order.length) {
      //meaning some order items were not found to exist
      console.log("Some Food Items Do not exist");
      return res.status(400).send("Some food items of the order do not exist");
    }

    console.log("FOUND FOOD OBJS");

    let bill = getBill(food_items);

    //now we have food_items and bill
    //------------------------------------------------------

    console.log("NOW SAVING ORDER");
    console.log(bill);
    console.log(food_items);

    const order = new Order({
      user_id: user._id,
      user_name: user.name,
      bill: bill,
      fooditems: food_items,
    });

    await order.save();

    res.send(order);
  } catch (ex) {
    console.log("ERROR:");
    console.log(ex);
    return res.status(500).send(ex.message);
  }
});
//getFoodOfTheDay

router.post("/getOrderStatus", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.body._id });
    res.send(order);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//view active order details
router.post("/activeOrders", auth, async (req, res) => {
  try {
    console.log(req.user._id);
    const orders = await Order.find({
      user_id: req.user._id,
      status: ["Queued", "Cooking"],
    })
      .sort({ date: 1 })
      .lean();

    console.log(orders);
    res.send(orders);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//view my order history
router.get("/orderHistory", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .sort({ date: 1 })
      .lean();

    console.log(orders);
    res.send(orders);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//Post Feedback
router.post("/giveFeedback", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send("Customer does not exist");

    let order = await Order.findById({ _id: req.body.order });
    if (!order) return res.status(400).send("Order not found...");

    if (order.status !== "Ready") return res.send("Order not Completed Yet...");

    const feedback = new Feedback({
      user: user._id,
      order: order._id,
      message: req.body.message,
      rating: req.body.rating,
    });

    await feedback.save();

    res.send(feedback);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

module.exports = router;
