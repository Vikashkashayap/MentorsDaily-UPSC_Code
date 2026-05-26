const User = require("../models/user.model");

exports.createUserRepo= async (userData) => {
  try {
    return await User.create(userData);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllUser = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findUserByIdRepo = async (filter) => {
  try {
    return await User.findOne(filter);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteUserRepo = async(id) => {
  try {
    return await User.findByIdAndDelete(id)
  } catch (error) {
        throw new Error(err.message);

  }
};

exports.updateUserByIdRepo = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      { $set: data },       
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};


