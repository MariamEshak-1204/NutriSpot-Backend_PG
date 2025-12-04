import express from "express";

import { register , login , getAllUsers } from "../controller/User_auth_controller.js";
import { validate } from "../middleware/validate.js";
import { userValidation , loginValidation } from "../services/auth_validation.js";


const authRouter = express.Router()

authRouter.route("/register").post( validate(userValidation) , register)
authRouter.route("/login").post(validate(loginValidation) , login)
authRouter.route("/users").get(getAllUsers)



export default authRouter;