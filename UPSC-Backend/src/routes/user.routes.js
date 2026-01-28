const express = require("express");
const userController = require("../controllers/user.controller");
const {
  auth,
  verifyTokenAndAdmin,
  verifyTokenAndSuperAdmin,
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/register",verifyTokenAndAdmin, userController.createUser);
router.post("/login", userController.login);
router.get("/users", verifyTokenAndAdmin, userController.findAllUser);
router.get("/users/:id", auth, userController.findUserById);
router.delete("/users/:id/delete",verifyTokenAndAdmin,userController.deleteUserController);
router.put("/users/:id/update",auth,userController.updateUserByIdController)
router.put("/users/:id/resetpassword",auth,userController.resetPasswordByIdController)



module.exports = router;
