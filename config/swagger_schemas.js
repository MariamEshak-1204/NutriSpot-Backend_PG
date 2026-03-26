// User Model 
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8c9a2b3e8f1a2d3c4e567"
 *         userName:
 *           type: string
 *           example: "Mariam Eshak"
 *         email:
 *           type: string
 *           example: "mariam@example.com"
 *         profileImage:
 *           type: string
 *           example: "https://example.com/images/profile.jpg"
 *         role:
 *           type: string
 *           enum: ["user", "admin"]
 *           example: "user"
 *         provider:
 *           type: string
 *           enum: ["local", "google", "facebook"]
 *           example: "local"
 *         gender:
 *           type: string
 *           enum: ["male", "female"]
 *           example: "female"
 *         age:
 *           type: number
 *           example: 25
 *         height:
 *           type: number
 *           example: 165
 *         weight:
 *           type: number
 *           example: 60
 *         mealsPerDay:
 *           type: number
 *           enum: [2, 3]
 *           example: 3
 *         allergies:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["Diabetes", "Lactose", "Gluten", "Nuts", "None"]
 *           example: ["Gluten", "Nuts"]
 *         goal:
 *           type: string
 *           enum: ["Lose weight", "Gain weight", "Improve health", "Maintain weight", "Build muscle"]
 *           example: "Lose weight"
 *         healthNotes:
 *           type: string
 *           example: "Avoid sugary drinks"
 *         activityLevel:
 *           type: string
 *           enum: ["Sedentary", "Light", "Moderate", "High"]
 *           example: "Moderate"
 *         dietType:
 *           type: string
 *           enum: ["High protein", "Vegan", "Low carb", "Keto"]
 *           example: "Low carb"
 *         calories:
 *           type: number
 *           example: 2000
 *         proteins:
 *           type: number
 *           example: 100
 *         carbs:
 *           type: number
 *           example: 250
 *         fats:
 *           type: number
 *           example: 70
 *         profileCompleted:
 *           type: string
 *           enum: ["true", "false"]
 *           example: "true"
 *         favorites:
 *           type: array
 *           items:
 *             type: string
 *             example: "64f8c9a2b3e8f1a2d3c4e789"
 *       required:
 *         - email
 *         - userName
 *         - role
 */


// Food model

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f9c1a2b3e8f1a2d3c4e999"
 *         name:
 *           type: string
 *           example: "Chicken Salad"
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Chicken", "Lettuce", "Tomato"]
 *         image:
 *           type: string
 *           example: "https://example.com/images/chicken_salad.jpg"
 *         price:
 *           type: number
 *           example: 120
 *         discount:
 *           type: number
 *           example: 10
 *         time:
 *           type: number
 *           example: 15
 *         calories:
 *           type: number
 *           example: 350
 *         protein:
 *           type: number
 *           example: 25
 *         carbs:
 *           type: number
 *           example: 30
 *         fats:
 *           type: number
 *           example: 15
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           enum: ["salad", "meal", "sandwich"]
 *           example: ["salad"]
 *         health:
 *           type: array
 *           items:
 *             type: string
 *           enum: ["high blood pressure", "heart disease", "diabetes"]
 *           example: ["diabetes"]
 *         diet:
 *           type: array
 *           items:
 *             type: string
 *           enum: ["vegan", "keto", "low carb", "high protein"]
 *           example: ["keto"]
 *         allergy:
 *           type: array
 *           items:
 *             type: string
 *           enum: ["none", "nuts", "gluten", "lactose"]
 *           example: ["none"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-26T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-26T12:30:00.000Z"
 */


// Order model 

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         food:
 *           type: string
 *           description: Food ObjectId
 *           example: "64f9c1a2b3e8f1a2d3c4e999"
 *         quantity:
 *           type: number
 *           example: 2
 *         price:
 *           type: number
 *           example: 120
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "650a1b2c3d4e5f6789012345"
 *         user:
 *           type: string
 *           description: User ObjectId
 *           example: "64f8c9a2b3e8f1a2d3c4e567"
 *         phone:
 *           type: number
 *           example: 01234567890
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalPrice:
 *           type: number
 *           example: 240
 *         paymentMethod:
 *           type: string
 *           enum: ["cash", "card", "vodafone", "orange", "etisalat"]
 *           example: "card"
 *         paymentStatus:
 *           type: string
 *           enum: ["pending", "paid", "failed"]
 *           example: "pending"
 *         transactionId:
 *           type: string
 *           example: "TRX123456789"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-26T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-26T12:30:00.000Z"
 */

// Cart model 


/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         food:
 *           type: string
 *           description: Food ObjectId
 *           example: "64f9c1a2b3e8f1a2d3c4e999"
 *         quantity:
 *           type: number
 *           example: 2
 *         price:
 *           type: number
 *           example: 120
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "650a1b2c3d4e5f6789012345"
 *         user:
 *           type: string
 *           description: User ObjectId
 *           example: "64f8c9a2b3e8f1a2d3c4e567"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalPrice:
 *           type: number
 *           example: 240
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-26T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-26T12:30:00.000Z"
 */



