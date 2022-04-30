const { validateFoodItems } = require("../models/fooditem");
const { getBill } = require("../routes/supporting_methods/customer");
const { getHighestOrderItem } = require("../routes/supporting_methods/menu");
const { validateCategory } = require("../models/category");
const { validateFeedback } = require("../models/feedback");

test("Calculate Total Bill", () => {
  const food_items = [
    {
      name: "Chunky Burger",
      price: 3000,
    },
    {
      name: "Pepsi",
      price: 100,
    },
    {
      name: "Chunky Burger",
      price: 3000,
    },
  ];

  let total = getBill(food_items);
  expect(total).toBe(6100);
});

test("Validate Food Item", () => {
  let item = {
    name: ".",
    price: 3000,
    category: { name: "Spicy and tasty" },
    ingredients: [""],
    description: "Very nice food",
  };

  let validation = validateFoodItems(item);
  expect(validation.error.details.length).toBeGreaterThan(0);

  item = {
    name: "Burger",
    price: -1,
    category: { name: "Spicy and tasty" },
    ingredients: [""],
    description: "Very nice food",
  };

  validation = validateFoodItems(item);
  expect(validation.error.details.length).toBeGreaterThan(0);
});

test("Get most ordered item", () => {
  let orders = [
    {
      user_name: "Haissam",
      bill: 2130,
      fooditems: [
        { _id: "625156eae01dec6e20d65c54" },
        { _id: "6251572ce01dec6e20d65c56" },
      ],
    },
    {
      user_name: "Ahmed",
      bill: 1234,
      fooditems: [
        { _id: "625156eae01dec6e20d65c54" },
        { _id: "625156eae01dec6e20d65c54" },
        { _id: "625156eae01dec6e20d65c54" },
        { _id: "625156eae01dec6e20d65c54" },
      ],
    },
  ];

  let highestItem = getHighestOrderItem(orders);
  expect(highestItem).toBe("625156eae01dec6e20d65c54");
});

test("category validation", () => {
  let cat = {
    _id: "625156a7e01dec6e20d65c52",
    name: null,
  };

  let validation = validateCategory(cat);
  expect(validation.error.details.length).toBeGreaterThan(0);

  cat = {
    _id: "625156a7e01dec6e20d65c52",
    name: ".",
  };

  validation = validateCategory(cat);
  expect(validation.error.details.length).toBeGreaterThan(0);
});

test("feedback validation", () => {
  let feedback = {
    user: { name: "haissam" },
    order: { bill: 1000 },
    rating: -1,
    message: "Order was really poor",
  };

  let validation = validateFeedback(feedback);
  expect(validation.error.details.length).toBeGreaterThan(0);

  feedback = {
    user: { name: "haissam" },
    order: { bill: 1000 },
    rating: 3,
    message: null,
  };

  validation = validateFeedback(feedback);
  expect(validation.error.details.length).toBeGreaterThan(0);
});
