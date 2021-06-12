const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, validateLogin, validateSignup } = require("../models/user");

router.post("/login", async(req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error);
    
        let user = await User.findOne({phone: req.body.phone});
        if (!user) return res.status(400).send("Invalid phone number or password");

        validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid phone number or password");

        const token = jwt.sign({ _id: user._id,role: user.role}, process.env.JWT_PRIVATE_KEY);

        res.send({id: user._id,avatar: user.avatar, name: user.name, role: user.role,access_token:token}); // all these parameters are needed. do not change them.  token will be sent later for validation
    }
    catch(ex) {
        console.log(ex.message);
    }
});

//show all foods
//change profile details
//get User details by id. Besides password ofcourse
//get all food categories


module.exports = router;