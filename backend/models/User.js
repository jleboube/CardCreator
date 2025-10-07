const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Update last login on save
userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.lastLogin = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
