const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateSignup } = require("../models/user");

router.post("/signup", async(req, res) => {
    try {
        const { error } = validateSignup(req.body,2);//2 is customer role 

        if (error) { return res.status(400).send(error.details[0].message); }

        let user = await User.findOne({phone: req.body.phone});
        if (user) { return res.status(400).send("Customer is already registered"); }

        let user_data = _.pick(req.body, ["name", "password", "phone"]);
        user_data.role = 2; // set id of customer role
        user = new User(user_data);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header("access_token", token).send(_.pick(user,["name", "_id", "role"]));
    }
    catch(ex) {
        console.log(ex.message);
    }
});


module.exports = router;