const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const validateToken = require("../Middleware/tokenHandler");

userRouter.route("/register").post(userController.registerUser);
userRouter.route("/login").post(userController.loginUser);
userRouter.route("/current").get(validateToken, userController.getCurrentUser);

module.exports = userRouter;