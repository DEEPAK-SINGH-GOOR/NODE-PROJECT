const mongoose = require("mongoose");

require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = connectDb;
