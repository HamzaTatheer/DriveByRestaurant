const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const _ = require("lodash");

const users = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
    console.error("Fatal Error: jwtPrivateKey is not defined!");
    process.exit(1);
}

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Project")
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.error("could not connect to mongoDB", err));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/login", users);