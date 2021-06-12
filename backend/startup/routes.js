const express = require('express');
const app = express();
const morgan = require('morgan');

const users = require("../routes/users");
const customers = require("../routes/customers");
const category = require("../routes/category");
const fooditem = require("../routes/fooditem");
const menu = require("../routes/menu");


module.exports = function(app) { 
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use("/api/users", users);
    app.use("/api/customers", customers);
    app.use("/api/menu", menu);
    app.use("/api/fooditem", fooditem);
    app.use("/api/category", category);
}