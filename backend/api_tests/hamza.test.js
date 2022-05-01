const createServer = require("../startup/createServer");
const User = require("../models/user");
const supertest = require('supertest');


describe("testing", ()=>{
    
    it("testingggg",async () =>{
        const request = await supertest(createServer());
        console.log("Hello");
        
    })
    
})