import express from "express";
import { protect } from "../middleware/auth_middleware.js";
import { getAllFoods, getFoodOffers, getHomeFoods, searchFood } from "../controllers/home_controller.js";
import { addToCart , getCart , updateQuantity , removeFromCart } from "../controllers/cart_controller.js";
import { addToFavorite, getFavorites, removeFromFavorite } from "../controllers/favorite_controller.js";
import { getFoodDetails } from "../controllers/foodDetails_controller.js"
import { checkout } from "../controllers/order_controller.js";
import { getFoodByAllergy, getFoodByCategory, getFoodByDiet, getFoodByHealth} from "../controllers/categoryFood_controller.js";

const homeRouter = express.Router();

homeRouter.get("/AllFoods", protect , getAllFoods )
homeRouter.get("/HomeFoods", protect , getHomeFoods )
homeRouter.get("/FoodOffers", getFoodOffers )
homeRouter.get("/SearchFood", searchFood);

homeRouter.post("/cart/add", protect, addToCart);
homeRouter.get("/cart", protect, getCart);
homeRouter.put("/cart/update", protect, updateQuantity);
homeRouter.delete("/cart/remove", protect, removeFromCart);

homeRouter.post("/favorite/add", protect, addToFavorite  );
homeRouter.post("/favorite/remove", protect, removeFromFavorite);
homeRouter.get("/favorite", protect, getFavorites);


homeRouter.get("/FoodDetails/:id",protect , getFoodDetails)

homeRouter.post("/orders/checkout", protect, checkout)

homeRouter.get("/Category/:category", getFoodByCategory)
homeRouter.get("/Health/:category", getFoodByHealth)
homeRouter.get("/Diet/:category", getFoodByDiet)
homeRouter.get("/Allergy/:category", getFoodByAllergy)



export default homeRouter;
