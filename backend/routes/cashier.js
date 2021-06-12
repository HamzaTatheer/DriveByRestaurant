const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');
const {Order} = require("../models/order");


//change food status
router.post("/updateStatus", auth, async(req, res) => {
    try 
    {
        if(req.user.role != 1) return res.status(403).send("Access Denied");

        let order = await Order.findById({ _id : req.body.orderId });
        if(!order) return res.status(400).send("Order not found...");
        console.log(order);

        order.status = req.body.status;

        await order.save();

        res.send(order);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

//view all orders
router.get("/orderHistory", auth, async(req, res) => {
    try {
        if(req.user.role != 1) return res.status(403).send("Access Denied");

        const orders = await Order.find({})
            .sort({date : 1})
            .lean();
    
        res.send(orders);
    }
    catch(ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

module.exports = router;