const mongoose = require("mongoose");

module.exports = async function () {
  await mongoose
    .connect(process.env.DB_URL || "mongodb://localhost/restaurant", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => {
      throw new Error(err); // used to break program and not run the whole node js server
    });
    
  //     mongoose.connect('mongodb://localhost/Proj')
  //  .then(()=> console.log("Connected to MongoDB..."))
  //  .catch(err=> console.error("Couldn't Connect to MongoDB...", err));
};
