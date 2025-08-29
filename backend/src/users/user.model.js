const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'admin',
  },
  profileImage: String,
  bio: { type: String, maxLength: 200 },
  profession: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Make sure spelling matches here
const User = model('User', userSchema);

module.exports = User;
