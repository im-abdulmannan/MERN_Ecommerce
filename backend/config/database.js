const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Connected to MongoDB Successful");
  });
};

module.exports = connectDatabase;
