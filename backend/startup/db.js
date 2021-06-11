const mongoose = require('mongoose');

module.exports = function() {

    mongoose.connect(process.env.DB_URL || "mongodb://localhost/Project",{useNewUrlParser: true,useUnifiedTopology: true})
        .then(() => console.log("connected to mongoDB"))
        .catch(err => {
            throw new Error(err); // used to break program and not run the whole node js server
        });
}