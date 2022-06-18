const initialiseEnvironmentVariables = require("../startup/dotenv");
const createExpressServer = require("../startup/createExpressServer");
const connectToDatabse = require("../startup/db");
const disconnectDatabase = require("../destroyServer/db");
const supertest = require("supertest");
const User = require("../models/user");

const app = createExpressServer();

describe("get api/admin/addCashier", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("adding new cashier", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
    await request
      .post("/api/admin/addCashier")
      .attach("avatar", "./api_tests/images/customer_pfp.jpg")
      .field("name", "hamzam")
      .field("phone", "03000000004")
      .field("password", "123123123123")
      .set("Accept", "application/json")
      .set("access_token", acess_token)
      .expect(200)
      .then((res) => {
        expect(res).toHaveProperty("body");
        expect(res.body._id).toStrictEqual(expect.any(String));
        expect(res.body._id.length).toBeGreaterThan(0);
        expect(res.body.avatar).toMatch(new RegExp("jpg$"));
        expect(res.body.name).toStrictEqual(expect.any(String));
        expect(res.body.role).toStrictEqual(expect.any(Number));
      });
  });
});

describe("get api/admin/removeCashier", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  let remove_cashier = undefined;

  afterAll(async () => {
    if (remove_cashier != undefined) {
      await User.User.remove({ _id: remove_cashier });
    }
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  test("removing cashier", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
    await request
      .post("/api/admin/removeCashier")
      .set("Accept", "application/json")
      .set("access_token", acess_token)
      .send({
        _id: "6288e19fc591df0af346e92c",
      })
      .expect(200)
      .then((res) => {
        expect(res.body._id).toStrictEqual(expect.any(String));
        remove_cashier = res.body._id;
      });
  });
});

describe("get api/admin/updateStatus", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });
  test("update status", async () => {
    let request = supertest(app);
    let acess_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
    await request
      .post("/api/admin/updateStatus")
      .set("Accept", "application/json")
      .set("access_token", acess_token)
      .send({
        _id: "62515861e01dec6e20d65c5e",
      })
      .expect(200)
      .then((res) => {
        expect(res.body._id).toStrictEqual(expect.any(String));
        // remove_cashier = res.body._id;
      });
  });
});
