const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const { User, validateLogin, validateSignup } = require("../models/user");

router.post("/signup", async(req, res) => {
    try {
        const { error } = validateSignup(req.body);

        if (error) { return res.status(400).send(error.details[0].message); }

        let user = await User.findOne({phone: req.body.phone});
        if (user) { return res.status(400).send("User already exists"); }

        user = new User(_.pick(req.body, ["name", "password", "phone", "role"]));
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


router.post("/login", async(req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error);
    
        let user = await User.findOne({phone: req.body.phone});
        if (!user) return res.status(400).send("Invalid email or password");

        validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid email or password");

        const token = jwt.sign({ _id: user._id}, config.get("jwtPrivateKey"));

        res.send({id: user._id, name: user.name, role: user.role,access_token:token}); // all these parameters are needed. do not change them.  token will be sent later for validation
    }
    catch(ex) {
        console.log(ex.message);
    }
});

module.exports = router;