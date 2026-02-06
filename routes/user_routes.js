import express from "express";

import { register, login, getAllUsers, googleLogin, facebookLogin } from "../controllers/user_auth_controller.js";
import { profileSetup, getProfile } from "../controllers/profileSetup_controller.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth_middleware.js";
import { userValidation, loginValidation, profileValidation } from "../services/user_validation.js";


const userRouter = express.Router()

// Auth Routes => Login  ,  Register 

userRouter.route("/register").post(validate(userValidation), register)
userRouter.route("/login").post(validate(loginValidation), login)
userRouter.route("/users").get(getAllUsers)
userRouter.route("/google-login").post(googleLogin)
userRouter.route("/facebook-login").post(facebookLogin)

// Profile Setup Route

userRouter.route("/profile").put(protect, validate(profileValidation), profileSetup);
userRouter.route("/profile").get(protect, getProfile)


export default userRouter;