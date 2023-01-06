const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

async function connectToDB() {
  let mongoURI = process.env.MONGO_URI;
  console.log("mongo URI --------->>>>" + mongoURI);
  return mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (err) {
      if (err) {
        console.log("connection error", err);
      } else {
        console.log("Connected to mongodb URI : " + mongoURI);
      }
    }
  );
}

module.exports = connectToDB;
