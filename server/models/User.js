const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//pre-save: before save, do something
userSchema.pre("save", function (next) {
  const user = this; //this

  //crypt password
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//methods
userSchema.methods.comparePassword = function (plainPassword, callback) {
  //plainPassword 1234567 & crypt password....
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
userSchema.methods.generateToken = function (callback) {
  const user = this;
  //create token with jsonwebtoken
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  //   console.log(typeof user._id.toHexString()); //string
  //   console.log(typeof user._id);//object
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  const user = this;
  //decoded token
  jwt.verify(token, "secretToken", function (err, decoded) {
    //search user with userId
    //& verify if client Token(cookie) is same with server Token(DB)
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
