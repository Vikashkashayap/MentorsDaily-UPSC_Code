const userRepository = require("../repositories/user.repository");
const {generateToken} = require("../middlewares/auth.middleware.js");
const logger = require('../utility/logger.js');

exports.createUserService = async (userData) => {
  try {
    logger.info(`userService.js <<create<< Starting user creation for email: ${userData.email}`);
    
    const createdUser = await userRepository.createUserRepo(userData);
    const { password, ...userWithoutPassword } = createdUser._doc;
    
    logger.info(`userService.js <<create<< User created successfully for email: ${userData.email}`);
    return userWithoutPassword;
  } catch (err) {
    logger.error(`userService.js <<create<< Error creating user: ${err.message}`);
    throw new Error(err.message);
  }
};

exports.login = async (email, password) => {
  try {
    logger.info(`userService.js <<login<< Starting login process for email: ${email}`);
    
    const user = await userRepository.findUserByIdRepo({ email });
    
    if (!user) {
      logger.error(`userService.js <<login<< User not found for email: ${email}`);
      throw new Error("Invalid credentials");
    }
    if (password !== user.password) {
      logger.error(`userService.js <<login<< Invalid password for email: ${email}`);
      throw new Error("Invalid credentials");
    }

    // if (!(await bcrypt.compare(password, user.password))) {
    //   logger.error(`userService.js <<login<< Invalid password for email: ${email}`);
    //   throw new Error("Invalid credentials");
    // }

    const token = generateToken(user._id, user.role);
    
    const { password: userPassword, ...userWithoutPassword } = user._doc || user;
    
    logger.info(`userService.js <<login<< Login successful for email: ${email}`);
    return {
      ...userWithoutPassword,
      token: `Bearer ${token}`
    };
  } catch (err) {
    logger.error(`userService.js <<login()<< Error during login: ${err.message}`);
    throw new Error(err.message);
  }
};
exports.findUserByIdService = async (id) => {
  try {
    logger.info(`userService.js <<findById<< Searching for user with ID: ${id}`);
    
    const user = await userRepository.findUserByIdRepo({ _id: id });
    
    if (user) {
      const { password, ...userWithoutPassword } = user._doc || user;
      logger.info(`userService.js <<findById<< User found for ID: ${id}`);
      return userWithoutPassword;
    } else {
      logger.info(`userService.js <<findById<< No user found for ID: ${id}`);
      return null;
    }
  } catch (err) {
    logger.error(`userService.js <<findById<< Error finding user by ID: ${err.message}`);
    throw new Error(err.message);
  }
};

exports.findAllUserService = async () => {
  try {
    logger.info('userService.js <<findAll<< Fetching all users');
    
    const users = await userRepository.findAllUser();
    
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user._doc || user;
      return userWithoutPassword;
    });
    
    logger.info(`userService.js <<findAll<< Successfully fetched ${users.length} users`);
    return usersWithoutPasswords;
  } catch (err) {
    logger.error(`userService.js <<findAll<< Error fetching all users: ${err.message}`);
    throw new Error(err.message);
  }
};

exports.deleteUserService = async (id) => {
  try {
    logger.info("userService.js <<delete<< Deleting all users");
    return await userRepository.deleteUserRepo(id);
  } catch (error) {
    logger.error(`userService.js <<deleteAll<< Deleting all users: ${err.message}`);
  throw new Error(err.message);
  }
};

exports.updateUserByIdService = async(id,data) => {
  try {
    return await userRepository.updateUserByIdRepo(id,data)
  } catch (error) {
    throw new Error(error.message)
  }
};

exports.resetPasswordByIdService = async(id,password) => {
  try {
  return await userRepository.updateUserByIdRepo(id,password)

  } catch (error) {
  throw new Error(error.message)

  }
}