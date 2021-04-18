const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const { User, validate } = require("../models/user");

router.post("/signup", async(req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({email: req.body.name});
        if (user) {
            return res.status(400).send("User already exists");
        }

        user = new User(_.pick(req.body, ["name", "password"]))
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send(_.pick(user,["name", "_id"]));
    }
    catch(ex) {
        console.log(ex.message);
    }
});


router.post("/login", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send("Invalid email or password");

        validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid email or password");

        const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

        res.send(token);
    }
    catch(ex) {
        console.log(ex.message);
    }
});

module.exports = router;