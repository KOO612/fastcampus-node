const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
  //   if (err) return cb(err);

  //   cb(null, isMatch);
  // });

  if (plainPassword === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({ error: "error" });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
