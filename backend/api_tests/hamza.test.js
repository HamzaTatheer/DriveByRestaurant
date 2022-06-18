jest.setTimeout(10000);
const User = require("../models/user");
const Category = require("../models/category");
const supertest = require("supertest");
const initialiseEnvironmentVariables = require("../startup/dotenv");
const createExpressServer = require("../startup/createExpressServer");
const connectToDatabse = require("../startup/db");
const disconnectDatabase = require("../destroyServer/db");

const app = createExpressServer();

describe("post /api/admin/getAllCategories route,post /api/admin/addCategory", () => {
  beforeAll(() => {
    initialiseEnvironmentVariables();
  });

  beforeAll((done) => {
    connectToDatabse().then(() => done());
  });

  afterAll((done) => {
    disconnectDatabase().then(() => done());
  });

  describe("Given that Database has been created with initial seed", () => {
    describe("Given that correct access token provided", () => {
      let added_category_id = undefined;

      it("add Correct Category Of Food", async () => {
        let request = supertest(app);
        let acess_token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
        await request
          .post("/api/admin/addCategory")
          .set("Accept", "application/json")
          .set("access_token", acess_token)
          .send({ name: "SnoopDogDrinkTest" })
          .expect(200)
          .then((res) => {
            expect(res.body._id).toStrictEqual(expect.any(String));
            added_category_id = res.body._id;
          });
      });

      it("Get back all category of food", async () => {
        let request = supertest(app);
        let acess_token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
        await request
          .get("/api/admin/getAllCategories")
          .set("Accept", "application/json")
          .set("access_token", acess_token)
          .expect(200)
          .then((res) => {
            expect(res.body.length).toBeGreaterThan(0);
          });
      });

      afterAll(async () => {
        if (added_category_id != undefined)
          await Category.Category.remove({ _id: added_category_id });
      });
    });

    it("Category Of Food returned when Access Token Not Provided in header", async () => {
      let request = supertest(app);
      await request.get("/api/admin/getAllCategories").expect(401);
    });

    it("Category Of Food returned when Empty Access Token Provided in header", async () => {
      let request = supertest(app);
      let acess_token = "";
      await request
        .get("/api/admin/getAllCategories")
        .set("Accept", "application/json")
        .set("access_token", acess_token)
        .expect(401);
    });
  });
});

describe("post /api/customer/signup route, post /api/user/login route", () => {
  describe("Given that Database has been created with initial seed", () => {
    //i thought these would work only for non nested function but it works for nested describe too. confirm with sir
    beforeAll(() => {
      initialiseEnvironmentVariables();
    });

    beforeAll((done) => {
      connectToDatabse().then(() => done());
    });

    afterAll((done) => {
      disconnectDatabase().then(() => done());
    });

    describe("Correct User details provided for both sign up and login", () => {
      let phone = "03000000013";
      let password = "123123123123";

      it("Correct Sign Up Info Provided", async () => {
        let request = supertest(app);
        await request
          .post("/api/customer/signup")
          .attach("avatar", "./api_tests/images/customer_pfp.jpg")
          .field("name", "omahamza")
          .field("phone", phone)
          .field("password", password)
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

      it("Correct Login Info Provided", async () => {
        let request = supertest(app);
        await request
          .post("/api/user/login")
          .send({ phone: phone, password: password })
          .expect(200)
          .then(async (res) => {
            //confusion if line below is necessary
            expect(res).toHaveProperty("body");
            expect(res.body).toHaveProperty("user");
            expect(res.body).toHaveProperty("access_token");
            expect(res.body.user._id).toStrictEqual(expect.any(String));
            expect(res.body.user._id.length).toBeGreaterThan(0);

            expect(res.body.user.avatar).toMatch(new RegExp("jpg$"));
            expect(res.body.user.name).toStrictEqual(expect.any(String));
            expect(res.body.user.role).toStrictEqual(expect.any(Number));

            await User.User.findOneAndDelete({ _id: res.body.user._id });
          });
      });
    });
  });
});

describe("post /api/fooditem route", () => {
  describe("Given that Database has been created with initial seed", () => {
    //i thought these would work only for non nested function but it works for nested describe too. confirm with sir
    beforeAll(() => {
      initialiseEnvironmentVariables();
    });

    beforeAll((done) => {
      connectToDatabse().then(() => done());
    });

    afterAll((done) => {
      disconnectDatabase().then(() => done());
    });

    it("Get All Food Items", async () => {
      let request = supertest(app);
      await request
        .get("/api/fooditem/")
        .expect(200)
        .then((res) => {
          expect(res).toHaveProperty("body");
          expect(res.body.length).toBeGreaterThanOrEqual(2); //default seed value
          console.log(res.body);
        });
    });
  });
});

//Learning
//code below would not work as beforeAll is called before each test case
//and for each test case to know about it, it should be at same scope level as code above
//rather than the one below

// beforeAll(()=>{
//     initialiseEnvironmentVariables()
// })

// beforeEach(done=>{
//     connectToDatabse().then(()=>done());
// })

// afterEach(done=>{
//     disconnectDatabase().then(()=>done());
// })

// describe("post /api/admin/getAllCategories route", ()=>{

//     describe("Given that Database has been created with initial seed",()=>{
//         it("Category Of Menu Items Exist",async () =>{
//             let request = supertest(app);

//             let acess_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
//             await request.get("/api/admin/getAllCategories").set('Accept', 'application/json')
//             .set("access_token",acess_token).expect(200).then((res)=>{
//                 expect(res.body.length).toBeGreaterThan(0);
//             });
//         })
//     })

// })
