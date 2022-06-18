const initialiseEnvironmentVariables = require("../startup/dotenv");
const createExpressServer = require("../startup/createExpressServer");
const connectToDatabse = require("../startup/db");
const disconnectDatabase = require("../destroyServer/db");
const supertest = require("supertest");
const FoodItem = require("../models/fooditem");
const Cashier = require("../models/user");
const app = createExpressServer();

describe("get /api/menu/menu", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  let remove_food_item = undefined;

  afterAll(async () => {
    if (remove_food_item != undefined) {
      await FoodItem.FoodItem.remove({ _id: remove_food_item });
    }
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("removing new food item", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";

    await request
      .post("/api/admin/removeFoodItem")
      .set("Accept", "application/json")
      .set("access_token", acess_token)
      .send({
        category: {
          _id: "625156a7e01dec6e20d65c52",
          name: "spicy food",
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body._id).toStrictEqual(expect.any(String));
        remove_food_item = res.body._id;
      });
  });

  test("checking get all food items", async () => {
    let request = supertest(app);

    await request
      .get("/api/menu/menu")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("get /api/admin/cashier", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("Get all cashiers", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";

    await request
      .post("/api/admin/getAllCashiers")
      .expect(200)
      .then((res) => {
        expect(res).toHaveProperty("body");
        expect(res.body.length).toBeGreaterThanOrEqual(0);
      });
  });
});

describe("get /api/admin/feedback", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("Get all feedback", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";

    await request
      .post("/api/admin/getAllFeedbacks")
      .expect(200)
      .then((res) => {
        expect(res).toHaveProperty("body");
        expect(res.body.length).toBeGreaterThanOrEqual(0);
        console.log();
      });
  });
});
