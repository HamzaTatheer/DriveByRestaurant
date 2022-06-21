jest.setTimeout(10000)

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

test("adding order with multiple Zup items in it", async () => {
Order.Order.create({
user_id: "6251bd7bfc23bf153b72a4c9",
user_name: "Bilal",
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
name: "Zup",
price: 100,
category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
description: "Enjoy food with Zup",
avatar: "avatar1649497900550.jpeg",
__v: 0,
},
{
ingredients: [""],
_id: "6251572ce01dec6e20d65c56",
name: "Zup",
price: 100,
category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
description: "Enjoy food with Zup",
avatar: "avatar1649497900550.jpeg",
__v: 0,
},
{
ingredients: [""],
_id: "6251572ce01dec6e20d65c56",
name: "Zup",
price: 100,
category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
description: "Enjoy food with Zup",
avatar: "avatar1649497900550.jpeg",
__v: 0,
},
{
ingredients: [""],
_id: "6251572ce01dec6e20d65c56",
name: "Zup",
price: 100,
category: { _id: "6251572ce01dec6e20d65c57", name: "drinks" },
description: "Enjoy food with Zup",
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

test("checking get specific food", async () => {
let request = supertest(app);

await request
.post("/api/food/food")
.set("Accept", "application/json")
.send({
id: added_food_item,
})
.expect(200)
.then((res) => {
expect(res.body.name).toStrictEqual("Test_Pizza");
});
});
});

describe("post /api/admin/getAllCategories route,post /api/admin/addCategory", ()=>{

    beforeAll(()=>{
        initialiseEnvironmentVariables()
    })
    
    beforeAll(done=>{
        connectToDatabse().then(()=>done());
    })
    
    afterAll(done=>{
        disconnectDatabase().then(()=>done());
    })

    describe("Given that Database has been created with initial seed",()=>{

        describe("Given that correct access token provided",()=>{

            let added_category_id = undefined;
            
            it("add Correct Category Of Fast Food",async () =>{
                let request = supertest(app);
                let acess_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
                await request.post("/api/admin/addCategory").set('Accept', 'application/json')
                .set("access_token",acess_token).send({ name:"SnoopDogDrinkTest" }).expect(200).then((res)=>{
                    expect(res.body._id).toStrictEqual(expect.any(String))
                    added_category_id = res.body._id;
                });
            }) 

            it("Get back all category of fast food",async () =>{
                let request = supertest(app);
                let acess_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
                await request.get("/api/admin/getAllCategories").set('Accept', 'application/json')
                .set("access_token",acess_token).expect(200).then((res)=>{
                    expect(res.body.length).toBeGreaterThan(0);
                });
            })
            
            afterAll(async ()=>{
                if(added_category_id != undefined)
                    await Category.Category.remove({_id:added_category_id});
            })


        })

        
        it("Category Of Food returned when Access Token Not Provided in header",async () =>{
            let request = supertest(app);
            await request.get("/api/admin/getAllCategories").expect(401);
        })

        it("Category Of Food returned when Empty Access Token Provided in header",async () =>{
            let request = supertest(app);
            let acess_token = "";
            await request.get("/api/admin/getAllCategories").set('Accept', 'application/json')
            .set("access_token",acess_token).expect(401)
        })

    })
    
})


describe("post /api/customer/signup route, post /api/user/login route", ()=>{

    describe("Given that Database has been created with initial seed",()=>{


        //i thought these would work only for non nested function but it works for nested describe too. confirm with sir
        beforeAll(()=>{
            initialiseEnvironmentVariables()
        })
        
        beforeAll(done=>{
            connectToDatabse().then(()=>done());
        })
        
        afterAll(done=>{
            disconnectDatabase().then(()=>done());
        })
                    

        describe("Correct User details provided for both sign up and login",()=>{


            let phone = "03000000013"
            let password = "123123123123"

            it("Correct Login Info Provided",async () =>{
                let request = supertest(app);
                await request.post("/api/user/login").send({phone:phone,password:password}).expect(200).then(async (res)=>{
                    //confusion if line below is necessary
                    expect(res).toHaveProperty("body")
                    expect(res.body).toHaveProperty("user")
                    expect(res.body).toHaveProperty("access_token")
                    expect(res.body.user._id).toStrictEqual(expect.any(String))
                    expect(res.body.user._id.length).toBeGreaterThan(0);
                    
                    expect(res.body.user.avatar).toMatch(new RegExp("jpg$"))
                    expect(res.body.user.name).toStrictEqual(expect.any(String))
                    expect(res.body.user.role).toStrictEqual(expect.any(Number))

                    await User.User.findOneAndDelete({_id:res.body.user._id});
                })
            })

        })
    })
})


describe("post /api/fooditem route",()=>{

    describe("Given that Database has been created with initial seed",()=>{

        //i thought these would work only for non nested function but it works for nested describe too. confirm with sir
        beforeAll(()=>{
            initialiseEnvironmentVariables()
        })
        
        beforeAll(done=>{
            connectToDatabse().then(()=>done());
        })
        
        afterAll(done=>{
            disconnectDatabase().then(()=>done());
        })

        
    it("Get All Food Items",async ()=>{
        
        let request = supertest(app);
        await request.get("/api/fooditem/").expect(200).then((res)=>{
            expect(res).toHaveProperty("body");
            expect(res.body.length).toBeGreaterThanOrEqual(2);//default seed value
        });
    });

    });

})

 beforeAll(()=>{
     initialiseEnvironmentVariables()
 })

 beforeEach(done=>{
     connectToDatabse().then(()=>done());
 })

 afterEach(done=>{
     disconnectDatabase().then(()=>done());
 })


 describe("post /api/admin/getAllCategories route", ()=>{

     describe("Given that Database has been created with initial seed",()=>{
         it("Category Of Menu Items Exist",async () =>{
             let request = supertest(app);
    
             let acess_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwNzQ0Njc1ZDgxYzJlNmMxOWYyMjIiLCJyb2xlIjowLCJpYXQiOjE2NDk0OTc1ODN9.fhKa2xy2Amyp7u0YYzfvnWImsi2ziUMWN4l42v3iENg";
             await request.get("/api/admin/getAllCategories").set('Accept', 'application/json')
             .set("access_token",acess_token).expect(200).then((res)=>{
                 expect(res.body.length).toBeGreaterThan(0);
             });
         })                
     })
 })
});






