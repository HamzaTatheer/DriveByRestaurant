const express = require("express");
//const path = require('path');

module.exports = function(app){
    //var public = path.join(__dirname, 'public'); may be useful later

    app.use('/public/uploads/profile_pictures',express.static('public/uploads/profile_pictures'));
    app.use('/public/uploads/food_pictures',express.static('public/uploads/food_pictures'));
}