import express from "express";
import { protect } from "../middleware/auth_middleware.js";
import { getAllFoods, getFoodOffers, getHomeFoods } from "../controllers/home_controller.js";

const homeRouter = express.Router();

homeRouter.route("/getAllFoods").get(protect , getAllFoods )
homeRouter.route("/getHomeFoods").get(protect , getHomeFoods )
homeRouter.route("/getFoodOffers").get( getFoodOffers )

export default homeRouter;
