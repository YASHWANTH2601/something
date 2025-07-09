const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // add other fields if needed (email, etc.)
});

module.exports = mongoose.model('User', userSchema);
