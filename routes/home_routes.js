import express from "express";
import { protect } from "../middleware/auth_middleware.js";
import { getAllFoods, getFoodOffers, getHomeFoods, searchFood } from "../controllers/home_controller.js";
import { addToCart , getCart , updateQuantity , removeFromCart } from "../controllers/cart_controller.js";
const homeRouter = express.Router();

homeRouter.route("/AllFoods").get(protect , getAllFoods )
homeRouter.route("/HomeFoods").get(protect , getHomeFoods )
homeRouter.route("/FoodOffers").get( getFoodOffers )
homeRouter.get("/SearchFood", searchFood);

homeRouter.post("/cart/add", protect, addToCart);
homeRouter.get("/cart", protect, getCart);
homeRouter.put("/cart/update", protect, updateQuantity);
homeRouter.delete("/cart/remove/:foodId", protect, removeFromCart);


export default homeRouter;
