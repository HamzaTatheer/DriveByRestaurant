const mongoose = require("mongoose");
module.exports = async function disconnectDatabase(){
    await mongoose.connection.close()
}