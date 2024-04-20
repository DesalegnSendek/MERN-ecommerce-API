const mongoose = require("mongoose");
const mongodb = require("mongodb");
const dotenv = require("dotenv");

//making sure files in env file to be string
dotenv.config();
const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    // const connected = await mongoose.connect(process.env.MongoDBConnection);
    const connected = await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log(`Mongodb connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};


module.exports = dbConnect;