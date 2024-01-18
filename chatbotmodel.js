const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  phone_number_id: String,
  from: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;