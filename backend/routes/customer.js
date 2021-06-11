const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config")

const { User, validateSignup } = require("../models/user");

router.post("/signup", async(req, res) => {
    try {
        const { error } = validateSignup(req.body);

        if (error) { return res.status(400).send(error.details[0].message); }

        let user = await User.findOne({phone: req.body.phone});
        if (user) { return res.status(400).send("User already exists"); }

        user = new User(_.pick(req.body, ["name", "password", "phone"]));
		user.role = 2;
		// creating a new property for user as here we are defining the customers only.
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send(_.pick(user,["name", "_id", "role"]));
    }
    catch(ex) {
        console.log(ex.message);
    }
});