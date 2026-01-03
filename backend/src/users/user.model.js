const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // ✅ correct
  },

  profileImage: String,
  bio: { type: String, maxLength: 200 },
  profession: String,

  // 🔥 STEP 2.2 — ADDRESS (Shipping Info)
  address: {
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔐 Compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);
module.exports = User;
