const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(?!.{51})[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  },
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^(?=.*\d)(?=.*[a-zA-Z!#$%&*+/=?^_{|}~-]).{4,20}$/
  },
  password: {
    type: String,
    required: true,
    match: /^[a-z0-9A-Z!#$%&*+/=?^_{|}~-]{8,20}$/
  }
});

module.exports = mongoose.model('User', userSchema);