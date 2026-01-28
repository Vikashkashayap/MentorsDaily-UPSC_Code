const mongoose = require("mongoose");
const{SUPER_ADMIN,ADMIN,USER,STUDENT}=require("../enums/enum.js");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: [SUPER_ADMIN,ADMIN,USER,STUDENT],
    default: USER,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
