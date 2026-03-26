import express from "express";
import { protect } from "../middleware/auth_middleware.js";
import { getAllFoods, getFoodOffers, getHomeFoods, searchFood } from "../controllers/home_controller.js";
import { addToCart , getCart , updateQuantity , removeFromCart } from "../controllers/cart_controller.js";
import { addToFavorite, getFavorites, removeFromFavorite } from "../controllers/favorite_controller.js";
import { getFoodDetails } from "../controllers/foodDetails_controller.js"
import { checkout } from "../controllers/order_controller.js";
import { getFoodByAllergy, getFoodByCategory, getFoodByDiet, getFoodByHealth} from "../controllers/categoryFood_controller.js";


const homeRouter = express.Router();
// app.use('/home' , homeRouter)

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Food, Cart, Favorites & Orders APIs
 */

// ================== FOODS ==================

/**
 * @swagger
 * /home/AllFoods:
 *   get:
 *     summary: Get all foods (protected)
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       401:
 *         description: Unauthorized
 */
homeRouter.get("/AllFoods", protect , getAllFoods )

/**
 * @swagger
 * /home/HomeFoods:
 *   get:
 *     summary: Get foods for home page (protected)
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of foods for home
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       401:
 *         description: Unauthorized
 */
homeRouter.get("/HomeFoods", protect , getHomeFoods )

/**
 * @swagger
 * /home/FoodOffers:
 *   get:
 *     summary: Get foods with offers (no auth required)
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of foods with discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */
homeRouter.get("/FoodOffers", getFoodOffers )

/**
 * @swagger
 * /home/SearchFood:
 *   get:
 *     summary: Search foods by query
 *     tags: [Foods]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Name of the food to search
 *     responses:
 *       200:
 *         description: List of matched foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */

homeRouter.get("/SearchFood", searchFood);

// ================== CART ==================

/**
 * @swagger
 * /home/cart/add:
 *   post:
 *     summary: Add a food item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: string
 *                 example: "64f9c1a2b3e8f1a2d3c4e999"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */

homeRouter.post("/cart/add", protect, addToCart);

/**
 * @swagger
 * /home/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */

homeRouter.get("/cart", protect, getCart);

/**
 * @swagger
 * /home/cart/update:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: string
 *                 example: "64f9c1a2b3e8f1a2d3c4e999"
 *               quantity:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */

homeRouter.put("/cart/update", protect, updateQuantity);

/**
 * @swagger
 * /home/cart/remove:
 *   delete:
 *     summary: Remove an item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: string
 *                 example: "64f9c1a2b3e8f1a2d3c4e999"
 *     responses:
 *       200:
 *         description: Cart updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */

homeRouter.delete("/cart/remove", protect, removeFromCart);

// ================== FAVORITES ==================


/**
 * @swagger
 * /home/favorite/add:
 *   post:
 *     summary: Add food to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: string
 *                 example: "64f9c1a2b3e8f1a2d3c4e999"
 *     responses:
 *       200:
 *         description: Food added to favorites
 *       401:
 *         description: Unauthorized
 */

homeRouter.post("/favorite/add", protect, addToFavorite);

/**
 * @swagger
 * /home/favorite/remove:
 *   delete:
 *     summary: Remove food from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: string
 *                 example: "64f9c1a2b3e8f1a2d3c4e999"
 *     responses:
 *       200:
 *         description: Food removed from favorites
 *       401:
 *         description: Unauthorized
 */

homeRouter.delete("/favorite/remove", protect, removeFromFavorite);

/**
 * @swagger
 * /home/favorite:
 *   get:
 *     summary: Get user's favorite foods
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       401:
 *         description: Unauthorized
 */

homeRouter.get("/favorite", protect, getFavorites);

// ================== FOOD DETAILS ==================

/**
 * @swagger
 * /home/FoodDetails/{id}:
 *   get:
 *     summary: Get details of a specific food
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Food details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Food not found
 */

homeRouter.get("/FoodDetails/:id",protect , getFoodDetails)

// ================== ORDERS ==================

/**
 * @swagger
 * /home/orders/checkout:
 *   post:
 *     summary: Checkout and create an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: number
 *                 example: 201234567890
 *               paymentMethod:
 *                 type: string
 *                 enum: ["cash", "card", "vodafone", "orange", "etisalat"]
 *                 example: "card"
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
homeRouter.post("/orders/checkout", protect, checkout)

// ================== FILTERS ==================

/**
 * @swagger
 * /home/Category:
 *   get:
 *     summary: Get foods by category
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: "meal"
 *         description: Category filter
 *     responses:
 *       200:
 *         description: List of foods in this category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */

homeRouter.get("/Category", getFoodByCategory)

/**
 * @swagger
 * /home/Health:
 *   get:
 *     summary: Get foods by health condition
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: health
 *         schema:
 *           type: string
 *           example: "diabetes"
 *     responses:
 *       200:
 *         description: List of foods for this health condition
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */

homeRouter.get("/Health", getFoodByHealth)

/**
 * @swagger
 * /home/Diet:
 *   get:
 *     summary: Get foods by diet type
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: diet
 *         schema:
 *           type: string
 *           example: "keto"
 *     responses:
 *       200:
 *         description: List of foods for this diet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */

homeRouter.get("/Diet", getFoodByDiet)

/**
 * @swagger
 * /home/Allergy:
 *   get:
 *     summary: Get foods by allergy
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: allergy
 *         schema:
 *           type: string
 *           example: "nuts"
 *     responses:
 *       200:
 *         description: List of foods safe for the allergy
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */

homeRouter.get("/Allergy", getFoodByAllergy)


// --------------------------------------------------------

// const homeRouter = express.Router();

// homeRouter.get("/AllFoods", protect , getAllFoods )
// homeRouter.get("/HomeFoods", protect , getHomeFoods )
// homeRouter.get("/FoodOffers", getFoodOffers )
// homeRouter.get("/SearchFood", searchFood);

// homeRouter.post("/cart/add", protect, addToCart);
// homeRouter.get("/cart", protect, getCart);
// homeRouter.put("/cart/update", protect, updateQuantity);
// homeRouter.delete("/cart/remove", protect, removeFromCart);

// homeRouter.post("/favorite/add", protect, addToFavorite  );
// homeRouter.delete("/favorite/remove", protect, removeFromFavorite);
// homeRouter.get("/favorite", protect, getFavorites);


// homeRouter.get("/FoodDetails/:id",protect , getFoodDetails)

// homeRouter.post("/orders/checkout", protect, checkout)

// homeRouter.get("/Category", getFoodByCategory)
// homeRouter.get("/Health", getFoodByHealth)
// homeRouter.get("/Diet", getFoodByDiet)
// homeRouter.get("/Allergy", getFoodByAllergy)



export default homeRouter;
