const { User, validateLogin, validateSignup } = require("../models/user");
const { hashPassword } = require("../routes/supporting_methods/auth_utils");
const { Category } = require("../models/category");

describe("user login", () => {
  // beforeAll(async ()=>{
  //     await require("../startup/db")();
  // })

  it("Correct User Credentials", async () => {
    const result = validateLogin({
      phone: "03001928199",
      password: "1231231231",
    });
    expect(result.error).toBeFalsy();
  });

  it("Correct User Credentials - password length = min length", async () => {
    const result = validateLogin({ phone: "03001928199", password: "12345" });
    expect(result.error).toBeFalsy();
  });

  it("Correct User Credentials - password length = min length - 1", async () => {
    const result = validateLogin({ phone: "03001928199", password: "1234" });
    expect(result.error).toBeTruthy();
    expect(result.error.message).toBe(
      '"password" length must be at least 5 characters long'
    );
  });

  it("Correct User Credentials - phone length < 11", async () => {
    const result = validateLogin({ phone: "0300192819", password: "1234" });
    expect(result.error).toBeTruthy();
  });

  it("Correct User Credentials - phone length > 11", async () => {
    const result = validateLogin({ phone: "030019281999", password: "1234" });
    expect(result.error).toBeTruthy();
    expect(result.error.message).toBe(
      '"password" length must be at least 5 characters long'
    );
  });

  // afterAll(async ()=>{
  //     require("mongoose").disconnect();
  // })
});

describe("Authentication Utilities", () => {
  it("check if hashPassword function returns a answer on correct password", async () => {
    let hash = await hashPassword("12345678910");
    expect(hash).not.toBeFalsy();
  });

  it("check if hashPassword function handles empty string", async () => {
    let f = async () => {
      try {
        await hashPassword("");
      } catch (e) {
        throw e;
      }
    };

    //await keyword is needed as f() runs asynchronously so we want expect to run before the function exits
    let e = new Error(expect.any(String));
    await expect(f).rejects.toThrow();
  });
});

describe("Database Initial State Validation", () => {
  beforeAll(async () => {
    await require("../startup/db")();
  });

  it("Check if atleast one category of food item exists", async () => {
    let doc = await Category.find();
    expect(doc.length).toBeGreaterThan(1);
  });

  afterAll(async () => {
    require("mongoose").disconnect();
  });
});
