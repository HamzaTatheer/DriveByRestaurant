const express = require('express');
const app = express();
const morgan = require('morgan');

const user = require("../routes/user");
const admin = require("../routes/admin");
const customer = require("../routes/customer");

module.exports = function(app) { 
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use("/api/user", user);
    app.use("/api/customer", customer);
    app.use("/api/admin", admin);
}