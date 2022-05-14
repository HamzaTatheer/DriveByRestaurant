const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const auth = require("../middleware/auth");
const { User, validateSignup } = require("../models/user");
const { FoodItem, validateFoodItems } = require("../models/fooditem");
const { Category, validateCategory } = require("../models/category");
const { Feedback } = require("../models/feedback");
const upload = require("../middleware/multer")(
  "public/uploads/profile_pictures/"
);
const uploadfoodItem = require("../middleware/multer")(
  "public/uploads/food_pictures/"
);

router.post(
  "/addCashier",
  [auth, upload.single("avatar")],
  async (req, res) => {
    try {
      if (req.user.role != 0)
        return res.status(403).send("no privelage to access resource");

      const { error } = validateSignup(req.body, 1); //1 is cashier role

      if (error) {
        console.log("validation error");
        return res.status(400).send(error.details[0].message);
      }

      let user = await User.findOne({ phone: req.body.phone });
      if (user) {
        console.log("already registered");
        return res.status(400).send("Cashier is already registered");
      }

      let user_data = _.pick(req.body, ["name", "password", "phone"]);
      user_data.avatar = req.file ? req.file.filename : null;
      user_data.role = 1;
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
  }
);

router.post(
  "/removeCashier",
  [auth, upload.single("avatar")],
  async (req, res) => {
    try {
      if (req.user.role != 0) return res.status(403).send("Access Denied");

      if (!req.body.id) res.status(400).send("No id in body to delete");

      User.findByIdAndDelete(req.body.id)
        .then((doc) =>
          doc ? res.send(doc) : res.status(400).send("Cashier not found")
        )
        .catch((err) => res.status(500).send());
    } catch (ex) {
      console.log(ex.message);
      res.status(500).send(ex.message);
    }
  }
);

//add food item
router.post(
  "/addFoodItem",
  [auth, uploadfoodItem.single("avatar")],
  async (req, res) => {
    try {
      const { error } = validateFoodItems(req.body);

      if (error) {
        console.log(error);
        return res.status(400).send(error.details[0].message);
      }

      const category = await Category.findById(req.body.category);

      if (!category) return res.status(400).send("Category not found.");

      const foodItem = new FoodItem({
        name: req.body.name,
        price: req.body.price,
        category: {
          name: category.name,
        },
        ingredients: req.body.ingredients,
        description: req.body.description,
      });
      foodItem.avatar = req.file ? req.file.filename : null;

      await foodItem.save();

      res.send(foodItem);
    } catch (ex) {
      console.log(ex.message);
      res.status(500).send(ex.message);
    }
  }
);

//remove food item
router.post("/removeFoodItem", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    if (!req.body.id) res.status(400).send("No Food Item with this id.");

    FoodItem.findByIdAndDelete(req.body.id)
      .then((doc) =>
        doc ? res.send(doc) : res.status(400).send("Food Item not found")
      )
      .catch((err) => res.status(500).send());
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//Get All foodItems
router.get("/getAllFoodItems", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    FoodItem.find()
      .then((doc) =>
        doc ? res.send(doc) : res.status(400).send("Food Item not found")
      )
      .catch((err) => res.status(500).send());
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//Get All Cashiers
router.get("/getAllCashiers", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    User.find({ role: 1 })
      .then((doc) => res.send(doc))
      .catch((err) => res.status(500).send());
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//Add Category
router.post("/addCategory", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    const { error } = validateCategory(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //const index = genres[]["id"];
    const category = new Category({
      name: req.body.name,
    });

    const result = await category.save();

    res.send(result);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//Remove Category
router.post("/removeCategory", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    if (!req.body.id) res.status(400).send("No Category with this id.");

    Category.findByIdAndDelete(req.body.id)
      .then((doc) =>
        doc ? res.send(doc) : res.status(400).send("Category not found")
      )
      .catch((err) => res.status(500).send());
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//Get All Categories
router.get("/getAllCategories", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    Category.find()
      .then((doc) =>
        doc ? res.send(doc) : res.status(400).send("Category not found")
      )
      .catch((err) => res.status(500).send());
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//Get All Feedbacks
router.get("/getAllFeedbacks", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    Feedback.find()
      .then((doc) =>
        doc ? res.send(doc) : res.status(400).send("Feedback not found")
      )
      .catch((err) => res.status(500).send());
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

//change food status
router.post("/updateStatus", auth, async (req, res) => {
  try {
    if (req.user.role != 0) return res.status(403).send("Access Denied");

    let order = await Order.findById({ _id: req.body.orderId });
    if (!order) return res.status(400).send("Order not found...");
    console.log(order);

    order.status = req.body.status;

    await order.save();

    res.send(order);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

module.exports = router;
