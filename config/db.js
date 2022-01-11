const mongoose = require('mongoose');

const connectDB = async() => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports = connectDB;

// https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
