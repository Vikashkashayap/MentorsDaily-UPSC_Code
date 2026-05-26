const userService = require("../services/user.service");
const logger = require('../utility/logger.js');
const { setBadRequest, setCreateSuccess, setServerError, setNotFoundError, setSuccess } = require("../utility/responseHelper.js");

exports.createUser = async (req, res) => {
  try {
    logger.info('userController.js <<create<< Starting user creation');
    
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.phone) {
      logger.error('userController.js <<create<< Missing required fields');
      return setBadRequest(res, { message: "Content cannot be empty!" });
    }

    const newUser = await userService.createUserService(req.body);
    
    logger.info(`userController.js <<create<< User created successfully: ${req.body.email}`);
    setCreateSuccess(res, {
      message: 'User created successfully',
      data: newUser
    });
  } catch (err) {
    if (err.code === 11000) {
      logger.error(`userController.js <<create<< Duplicate user: ${req.body.email}`);
      return setBadRequest(res, {
        message: "User already exists"
      });
    }
    logger.error(`userController.js <<create<< Error creating user: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    logger.info('userController.js <<login<< Starting user login');
    
    const { email, password } = req.body;

    if (!email || !password) {
      logger.error('userController.js <<login<< Missing email or password');
      return setBadRequest(res, { message: "Please provide email and password." });
    }

    const userData = await userService.login(email, password);
    
    logger.info(`userController.js <<login<< User logged in successfully: ${email}`);
    setSuccess(res, {
      message: 'Login successful',
      data: userData
    });
  } catch (err) {
    logger.error(`userController.js <<login<< Error during login: ${err.message}`);
    if (err.message === "Invalid credentials") {
      return setBadRequest(res, { message: err.message });
    }
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.findAllUser = async (req, res) => {
  try {
    logger.info('userController.js <<findAll<< Fetching all users');
    
    const users = await userService.findAllUserService();
    
    logger.info(`userController.js <<findAll<< Successfully fetched ${users.length} users`);
    setSuccess(res, {
      message: 'Users fetched successfully',
      data: users
    });
  } catch (err) {
    logger.error(`userController.js <<findAll<< Error fetching users: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`userController.js <<findById<< Fetching user by ID: ${id}`);
    
    const user = await userService.findUserByIdService(id);
    
    if (!user) {
      logger.error(`userController.js <<findById<< User not found for ID: ${id}`);
      return setNotFoundError(res, {
        message: 'User not found'
      });
    }
    
    logger.info(`userController.js <<findById<< User fetched successfully for ID: ${id}`);
    setSuccess(res, {
      message: 'User fetched successfully',
      data: user
    });
  } catch (err) {
    logger.error(`userController.js <<findById<< Error fetching user: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.deleteUserController = async (req, res) => {
  try {
    logger.info("userController.js <<deleteAll<< Deleting all users");

    const user = await userService.deleteUserService(req.params.id);
    setSuccess(res, {
      message: "User deleted successfully",
      data: user,
    });
  } catch (err) {
    logger.error(
      `userController.js <<deleteById<< Error fetching user: ${err.message}`
    );

    setServerError(res, { message: err.message || "Internal server error" });
  }
};

exports.updateUserByIdController = async(req,res) => {
  try {
    const userId = req.params.id
    const data = req.body
    if(data.password){
      setBadRequest(res,{
        message: "Invalid Request"
      })
    }
    if(!data){
    setBadRequest(res,{
      message: "Empty request"
    })
    }
    const user = await userService.updateUserByIdService(userId,data);
    setSuccess(res, {
      message: "User updated successfully",
      data: user,
    });
    
  } catch (err) {
    setServerError(res, { message: err.message || "Internal server error" });

  }
};

exports.resetPasswordByIdController = async(req,res) => {
  try {
    const userId = req.params.id
    const data = req.body
    if(!data.password){
      setBadRequest(res,{
        message: "Invalid Request"
      })
    }
    const user = await userService.resetPasswordByIdService(userId,data);
    setSuccess(res, {
      message: "Password reset done successfully",
      data: user,
    });
    
  } catch (err) {
    setServerError(res, { message: err.message || "Internal server error" });

  }
}