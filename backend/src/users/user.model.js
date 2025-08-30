const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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


//hasing passwords
userSchema.pre('save' ,async function(next){
  const user = this;
  if(!user.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(user.password,10);
  user.password=hashedPassword;
  next();
})
// match password
userSchema.methods.comparePassword = function (candidatePassword){
  return bcrypt.compare(candidatePassword,this.password);
}


// ✅ Make sure spelling matches here
const User = model('User', userSchema);

module.exports = User;
