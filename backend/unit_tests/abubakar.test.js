const { validateCategory } = require("../models/category");
const { validateOrder } = require("../models/order");
const { validateFoodItems } = require("../models/fooditem");

test("category validation", () => {
  let cat = {
    _id: "625156a7e01dec6e20d65c52",
    name: null,
  };

  let validation = validateCategory(cat);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe('"name" must be a string');

  cat = {
    _id: "625156a7e01dec6e20d65c52",
    name: ".",
  };

  validation = validateCategory(cat);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe(
    '"name" length must be at least 3 characters long'
  );
});

test("Validate Order", () => {
  let order = {
    user: { name: "Abubakar" },
    bill: "3100",
    status: "Queued",
    fooditems: [""],
  };

  let validation = validateOrder(order);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe(
    '"fooditems[0]" must be of type object'
  );

  console.log(validation.error.details);

  order = {
    user: { name: "." },
    bill: "2220",
    status: "Queued",
    fooditems: null,
  };

  validation = validateOrder(order);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe('"fooditems" must be an array');

  // console.log(validation.error.details);
});

test("Validate Food Lists", () => {
  let item = {
    name: "asdfjkhsdkjfhskdjbfkjsbdkjbfksjdbfjhbehbrfhbhberjhbfjnrejfbjrenbfjnrefbnjre",
    price: 1000,
    category: { name: "Spicy and tasty" },
    ingredients: [""],
    description: "Good food",
  };

  let validation = validateFoodItems(item);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe(
    '"name" length must be less than or equal to 50 characters long'
  );

  // console.log(validation.error.details);

  item = {
    name: "Burger",
    price: -1,
    category: { name: "Spicy and tasty" },
    ingredients: null,
    description: null,
  };

  validation = validateFoodItems(item);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe(
    '"price" must be greater than or equal to 0'
  );
});
