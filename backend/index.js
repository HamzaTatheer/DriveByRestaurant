const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('config');
const morgan = require('morgan');
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const users = require("./routes/users");

if (!config.get("jwtPrivateKey")) {
    console.error("Fatal Error: jwtPrivateKey is not defined!");
    process.exit(1);
}

mongoose.connect("mongodb://localhost/Project")
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.error("could not connect to mongoDB", err));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/users", users);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});