import express from "express";

import { register, login, getAllUsers, googleLogin, facebookLogin } from "../controllers/user_auth_controller.js";
import { profileSetup, getProfile } from "../controllers/profileSetup_controller.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth_middleware.js";
import { userValidation, loginValidation, profileValidation } from "../services/user_validation.js";



const userRouter = express.Router()

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: User data for registration
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "Mariam Eshak"
 *               email:
 *                 type: string
 *                 example: "mariam@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input (missing fields or invalid format)
 *       500:
 *         description: Internal server error
 */
userRouter.route("/register").post(validate(userValidation), register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: User credentials for login
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "mariam@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Logged in successfully, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
userRouter.route("/login").post(validate(loginValidation), login);

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.route("/users").get(getAllUsers);

/**
 * @swagger
 * /user/google-login:
 *   post:
 *     summary: Login or register with Google
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: Google OAuth token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "google_oauth_token_here"
 *     responses:
 *       200:
 *         description: Logged in via Google successfully, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid Google token
 *       500:
 *         description: Internal server error
 */
userRouter.route("/google-login").post(googleLogin);

/**
 * @swagger
 * /user/facebook-login:
 *   post:
 *     summary: Login or register with Facebook
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: Facebook OAuth token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "facebook_oauth_token_here"
 *     responses:
 *       200:
 *         description: Logged in via Facebook successfully, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid Facebook token
 *       500:
 *         description: Internal server error
 */
userRouter.route("/facebook-login").post(facebookLogin);

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Fields to update in user profile
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *       500:
 *         description: Internal server error
 */
userRouter.route("/profile").put(protect, validate(profileValidation), profileSetup)

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
userRouter.route("/profile").get(protect, getProfile)


// -----------------------------------------------

// const userRouter = express.Router()

// // Auth Routes => Login  ,  Register 

// userRouter.route("/register").post(validate(userValidation), register)
// userRouter.route("/login").post(validate(loginValidation), login)
// userRouter.route("/users").get(getAllUsers)
// userRouter.route("/google-login").post(googleLogin)
// userRouter.route("/facebook-login").post(facebookLogin)

// // Profile Setup Route

// userRouter.route("/profile").put(protect, validate(profileValidation), profileSetup);
// userRouter.route("/profile").get(protect, getProfile)


export default userRouter;