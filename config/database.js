//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/ecommercemanel";
mongoose.connect(
  mongoDB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log('successffuly connected to db')
  }
);
mongoose.Promise = global.Promise;
module.exports = mongoose;