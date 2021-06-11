const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateSignup } = require("../models/user");
const upload = require("../middleware/multer")("public/uploads/profile_pictures/");

router.post("/signup",upload.single('avatar'), async(req, res) => {
    try {

        const { error } = validateSignup(req.body,2);//2 is customer role 

        if (error) { return res.status(400).send(error.details[0].message); }

        let user = await User.findOne({phone: req.body.phone});
        if (user) { return res.status(400).send("Customer is already registered"); }

        let user_data = _.pick(req.body, ["name", "password", "phone"]);
        user_data.avatar = req.file ? req.file.filename : null;
        user_data.role = 2;
        user = new User(user_data);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header("access_token", token).send(_.pick(user,["name", "_id", "role", "avatar"]));
    }
    catch(ex) {
        console.log(ex.message);
    }
});

//orderFood
//getFoodOfTheDay
//view active order details
//view my order history


module.exports = router;