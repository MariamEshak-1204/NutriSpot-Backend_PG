import express from "express";
import { upload } from "../middleware/multer.js";
import { register, login, getAllUsers, googleLogin, facebookLogin } from "../controllers/user_auth_controller.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth_middleware.js";
import { userValidation, loginValidation, profileValidation } from "../services/user_validation.js";
import { 
    profileSetup,
    getProfile,
    changePassword,
    deleteAccount,
    signOut,
    updateProfileWithImage
} from "../controllers/profileSetup_controller.js";

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

// ---------------------------------------------------------


/**
 * @swagger
 * /user/profile/setup:
 *   put:
 *     summary: Complete user profile setup
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             gender: female
 *             age: 22
 *             height: 165
 *             weight: 55
 *             mealsPerDay: 3
 *             allergies: ["None"]
 *             goal: "Lose weight"
 *             activityLevel: "Moderate"
 *             dietType: "High protein"
 *     responses:
 *       200:
 *         description: Profile setup completed
 */

userRouter.route("/profile/setup").put(protect, validate(profileValidation), profileSetup)
userRouter.put(
  "/profile/image",
  protect,
  upload.single("image"),
  updateProfileWithImage
);

/**
 * @swagger
 * /user/profile/deleteAccount:
 *   delete:
 *     summary: Delete user account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 */

userRouter.route("/profile/deleteAccount").delete(protect , deleteAccount)

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

userRouter.route("/profile").get(protect , getProfile)

/**
 * @swagger
 * /user/profile/password:
 *   put:
 *     summary: Change user password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             lastPassword: "123456"
 *             newPassword: "abcdef"
 *             confirmPassword: "abcdef"
 *     responses:
 *       200:
 *         description: Password changed successfully
 */

userRouter.route("/profile/password").put(protect, changePassword);

/**
 * @swagger
 * /user/profile/signout:
 *   post:
 *     summary: Logout user (invalidate token)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Signed out successfully
 */

userRouter.route("/profile/signout").post(protect, signOut);

// ----------------------------------------

//   app.use('/user' , userRouter )  in index.js 
// // Auth Routes => Login  ,  Register 

// userRouter.route("/register").post(validate(userValidation), register)
// userRouter.route("/login").post(validate(loginValidation), login)
// userRouter.route("/users").get(getAllUsers)
// userRouter.route("/google-login").post(googleLogin)
// userRouter.route("/facebook-login").post(facebookLogin)

// // Profile Setup Route

// userRouter.route("/profile/setup").put(protect,uploadProfileImage.single("image"), validate(profileValidation), profileSetup)
// userRouter.route("/profile/deleteAccount").delete(protect , deleteAccount)
// userRouter.route("/profile").get(protect , getProfile)
// userRouter.route("/profile/password").put(protect, changePassword);
// userRouter.route("/profile/signout").post(protect, signOut);

export default userRouter;