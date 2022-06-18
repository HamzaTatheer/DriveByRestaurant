const initialiseEnvironmentVariables = require("../startup/dotenv");
const createExpressServer = require("../startup/createExpressServer");
const connectToDatabse = require("../startup/db");
const disconnectDatabase = require("../destroyServer/db");
const supertest = require("supertest");
const FoodItem = require("../models/fooditem");
const Order = require("../models/order");

const app = createExpressServer();

describe("get /api/menu/menu", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  let added_food_item = undefined;

  afterAll(async () => {
    if (added_food_item != undefined) {
      await FoodItem.FoodItem.remove({ _id: added_food_item });
    }
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("adding new food item", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";

    await request
      .post("/api/admin/addFoodItem")
      .set("Accept", "application/json")
      .set("access_token", acess_token)
      .send({
        name: "Test_Burger",
        price: 1500,
        category: {
          _id: "625156a7e01dec6e20d65c52",
          name: "spicy food",
        },
        ingredients: ["salt", "chicken"],
        description: "Test description!",
      })
      .expect(200)
      .then((res) => {
        expect(res.body._id).toStrictEqual(expect.any(String));
        added_food_item = res.body._id;
      });
  });

  test("checking get all food items", async () => {
    let request = supertest(app);

    await request
      .get("/api/menu/menu")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        debugger;
        expect(res.body.length).toBeGreaterThan(0);
        console.log(res);
      });
  });
});

describe("get /api/menu/orderOfTheDay", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  let order_added = undefined;

  afterAll(async () => {
    if (order_added != undefined) {
      await Order.Order.remove({ _id: order_added });
    }
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("adding order with multiple pepsi items in it", async () => {
    Order.Order.create({
      user_id: "6251bd7bfc23bf153b72a4c9",
      user_name: "Haissam",
      bill: 1500,
      status: "Ready",
      fooditems: [
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
        {
          ingredients: [""],
          _id: "6251572ce01dec6e20d65c56",
          name: "Pepsi",
          price: 100,
          category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
          description: "Enjoy food with pepsi",
          avatar: "avatar1649497900550.jpeg",
          __v: 0,
        },
      ],
    }).then((rst) => {
      expect(rst).toBeDefined;
      expect(rst._id).toBeDefined;
      expect(rst._id).not.toBeNull;
      order_added = rst._id;
    });
  });

  test("checking orderOfTheDay", async () => {
    let request = supertest(app);

    await request
      .get("/api/menu/orderOfTheDay")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]._id).toStrictEqual("6251572ce01dec6e20d65c56");
      });
  });
});

describe("post /api/fooditem/fooditem", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  let added_food_item = undefined;

  afterAll(async () => {
    if (added_food_item != undefined) {
      await FoodItem.FoodItem.remove({ _id: added_food_item });
    }
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("adding new food item", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";

    await request
      .post("/api/admin/addFoodItem")
      .set("Accept", "application/json")
      .set("access_token", acess_token)
      .send({
        name: "Test_Burger",
        price: 1500,
        category: {
          _id: "625156a7e01dec6e20d65c52",
          name: "spicy food",
        },
        ingredients: ["salt", "chicken"],
        description: "Test description!",
      })
      .expect(200)
      .then((res) => {
        expect(res.body._id).toStrictEqual(expect.any(String));
        added_food_item = res.body._id;
      });
  });

  test("checking get specific food item", async () => {
    let request = supertest(app);

    await request
      .post("/api/fooditem/fooditem")
      .set("Accept", "application/json")
      .send({
        id: added_food_item,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.name).toStrictEqual("Test_Burger");
      });
  });
});
