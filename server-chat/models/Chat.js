const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: String,
    message: String
  });

  module.export = mongoose.model('Chat', chatSchema);