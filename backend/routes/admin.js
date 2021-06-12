const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt_verify = require("../middleware/auth");
const Joi = require("joi");

const { User, validateSignup } = require("../models/user");
const upload = require("../middleware/multer")("public/uploads/profile_pictures/");


router.post("/addCashier",[jwt_verify,upload.single('avatar')], async(req, res) => {
    try {

        if(req.user.role != 0) return res.status(400).send("no privelage to access resource");

        const { error } = validateSignup(req.body,1);//1 is cashier role 

        if (error) { return res.status(400).send(error.details[0].message); }

        let user = await User.findOne({phone: req.body.phone});
        if (user) { return res.status(400).send("Cashier is already registered"); }

        let user_data = _.pick(req.body, ["name", "password", "phone"]);
        user_data.avatar = req.file ? req.file.filename : null;
        user_data.role = 1;
        user = new User(user_data);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header("access_token", token).send(_.pick(user,["name", "_id", "role", "avatar"]));
    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send();
    }
});


router.post("/removeCashier",[jwt_verify,upload.single('avatar')], async(req, res) => {
    try {

        if(!req.body.id) res.status(400).send("No id in body to delete");

        User.findByIdAndDelete(req.body.id).then(doc => doc ? res.send(doc) : res.status(400).send("Cashier not found")).catch((err)=>res.status(500).send());

    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send();
    }
});


//add food item
//remove food item

module.exports = router;