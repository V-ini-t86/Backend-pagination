const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.SERVER_DATABASE, {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then((res) => {
    console.log(`database connected`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
