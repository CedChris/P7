const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserShema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    minlenght: 2,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    validate: isEmail,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  picture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  }
});
const userModel = mongoose.model("user", UserShema);
module.exports = userModel;
