const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log("User database connected successfully");
    })
    .catch((err) => {
      console.log("error", err);
    });
};

module.exports = connectToDatabase;  
