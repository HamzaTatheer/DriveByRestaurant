const express = require("express");
const router = express.Router();
const { Category, validateCategory } = require("../models/category");
const { FoodItem, validateFoodItems } = require("../models/fooditem");

//Get all foodItems
router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodItem.find()
      .select({ name: 1 })
      .sort({ name: 1 })
      .lean();

    res.send(foodItems);
  } catch (error) {
    res.status(500).send("Server Error.");
  }
});

router.post("/fooditem", async (req, res) => {
  try {
    const foodItems = await FoodItem.findOne({ _id: req.body.id });
    console.log(foodItems);
    return res.send(foodItems);
  } catch (error) {
    res.status(500).send("Server Error.");
  }
});

//Post a foodItem
router.post("/", async (req, res) => {
  const { error } = validateFoodItems(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);

  if (!category) return res.status(400).send("Category not found.");

  const foodItem = new FoodItem({
    name: req.body.name,
    price: req.body.price,
    category: req.body.categoryId,
    ingredients: req.body.ingredients,
    description: req.body.description,
  });

  try {
    const result = await foodItem.save();
    console.log(result);
  } catch (ex) {
    console.log("Error", ex.message);
  }
  res.send(foodItem);
});

module.exports = router;
