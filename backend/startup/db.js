const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect("mongodb://localhost/Project")
        .then(() => console.log("connected to mongoDB"))
        .catch(err => console.error("could not connect to mongoDB", err));
}