const { validateFoodItems } = require("../models/fooditem");
const { getBill } = require("../routes/supporting_methods/customer");
const { getHighestOrderItem } = require("../routes/supporting_methods/menu");
const { validateCategory } = require("../models/category");

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

test("Invalid food item name", () => {
  let item = {
    name: ".",
    price: 3000,
    category: { name: "Spicy and tasty" },
    ingredients: [""],
    description: "Very nice food",
  };

  let validation = validateFoodItems(item);
  expect(validation.error.details.length).toBeGreaterThan(0);
});

test("Invalid foot item price", () => {
  let item = {
    name: "Burger",
    price: -1,
    category: { name: "Spicy and tasty" },
    ingredients: [""],
    description: "Very nice food",
  };

  let validation = validateFoodItems(item);
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

test("Null category", () => {
  let cat = {
    _id: "625156a7e01dec6e20d65c52",
    name: null,
  };

  let validation = validateCategory(cat);
  console.log(validation);
  expect(validation.error.details.length).toBeGreaterThan(0);
});
