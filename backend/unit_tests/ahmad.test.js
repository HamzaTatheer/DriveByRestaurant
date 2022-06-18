const { validateFoodItems } = require("../models/fooditem");
const { validateFeedback } = require("../models/feedback");

test("Validate Food Product", () => {
  let item = {
    price: 3000,
    category: { name: "Spicy" },
    ingredients: [""],
    description: "nice",
  };

  let validation = validateFoodItems(item);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe('"name" is required');

  item = {
    name: "Pasta",
    category: { name: "tasty" },
    ingredients: [""],
    description: "not nice",
  };

  validation = validateFoodItems(item);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe('"price" is required');
});

test("feedback validation", () => {
  let feedback = {
    user: { name: "ahmad" },
    order: { bill: 2000 },
    rating: -1,
    message: "Order was really poor",
  };

  let validation = validateFeedback(feedback);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe(
    '"rating" must be greater than or equal to 1'
  );

  feedback = {
    user: { name: "haissam" },
    order: { bill: 1000 },
    rating: 3,
    message: null,
  };

  validation = validateFeedback(feedback);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe('"message" must be a string');

  feedback = {
    user: { name: "abubakar" },
    order: { bill: 100 },
    rating: 8,
    message: null,
  };

  validation = validateFeedback(feedback);
  expect(validation.error.details.length).toBeGreaterThan(0);
  expect(validation.error.message).toBe(
    '"rating" must be less than or equal to 5'
  );
});
