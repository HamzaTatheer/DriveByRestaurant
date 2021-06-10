const express = require('express');
const app = express();
const morgan = require('morgan');

const users = require("../routes/users");

module.exports = function(app) { 
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use("/api/users", users);
}