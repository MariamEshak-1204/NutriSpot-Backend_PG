import express from "express";

import { register, login, getAllUsers, googleLogin, facebookLogin } from "../controller/user_auth_controller.js";
import { profileSetup , getProfile } from "../controller/profileSetup_controller.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth_middleware.js";
import { userValidation, loginValidation, profileValidation } from "../services/auth_validation.js";


const authRouter = express.Router()

// Auth Routes

authRouter.route("/register").post(validate(userValidation), register)
authRouter.route("/login").post(validate(loginValidation), login)
authRouter.route("/users").get(getAllUsers)
authRouter.route("/google-login").post(googleLogin)
authRouter.route("/facebook-login").post(facebookLogin)

// Profile Setup Route
authRouter.route("/profile").put(protect, validate(profileValidation), profileSetup);
authRouter.route("/profile").get(protect, getProfile)


export default authRouter;