
import { recommendMeals as aiRecommendMeals } from "../services/ai_service.js";
import Meal from "../models/meal_model.js";
import Food from "../models/food_model.js";
import User from "../models/user_model.js";
import { calculateNutrition } from "../services/nutrition_calculator.js";


export const recommendMeals = async (req, res) => {
    try {
        const userData = req.body;


        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const dbUser = await User.findById(req.user.id);

        if (!dbUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // ================= MERGE DATA =================
        const finalUser = {
            ...dbUser.toObject(),
            ...userData
        };


        // ================= VALIDATION FIRST =================
        if (
            !finalUser.gender ||
            !finalUser.age ||
            !finalUser.height ||
            !finalUser.weight ||
            !finalUser.activityLevel ||
            !finalUser.goal
        ) {
            return res.status(400).json({
                success: false,
                message: "Please complete your profile first"
            });
        }

        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "User data is required"
            });
        }
        // ================= MODE VALIDATION =================
        if (!userData.mode || !["auto", "manual"].includes(userData.mode)) {
            return res.status(400).json({
                success: false,
                message: "mode must be either 'auto' or 'manual'"
            });
        }

        // ================= SAVE PROFILE =================
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    gender: finalUser.gender,
                    age: finalUser.age,
                    height: finalUser.height,
                    weight: finalUser.weight,
                    activityLevel: finalUser.activityLevel,
                    goal: finalUser.goal,
                    mealsPerDay: finalUser.mealsPerDay,
                    allergies: finalUser.allergies,
                    healthCondition: finalUser.healthCondition,
                    healthNotes: finalUser.healthNotes,
                    dietType: finalUser.dietType,
                    profileCompleted: true
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        console.log(updatedUser);
        let nutritionData;

        // ================= AUTO MODE =================
        if (userData.mode === "auto") {

            nutritionData = calculateNutrition(finalUser);

            await User.findByIdAndUpdate(
                req.user.id,
                {
                    $set: {
                        calories: nutritionData.calories,
                        proteins: nutritionData.proteins,
                        carbs: nutritionData.carbs,
                        fats: nutritionData.fats
                    }
                }
            );
        }
        // ================= MANUAL MODE =================
        else {

            // تأكد إن المستخدم بعت القيم المطلوبة
            if (
                userData.calories == null ||
                userData.proteins == null ||
                userData.carbs == null ||
                userData.fats == null
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Calories, proteins, carbs and fats are required in manual mode"
                });
            }

            nutritionData = {
                calories: userData.calories,
                proteins: userData.proteins,
                carbs: userData.carbs,
                fats: userData.fats
            };
            // نحفظ القيم اللي دخلها المستخدم
            await User.findByIdAndUpdate(
                req.user.id,
                {
                    $set: {
                        calories: nutritionData.calories,
                        proteins: nutritionData.proteins,
                        carbs: nutritionData.carbs,
                        fats: nutritionData.fats
                    }
                }
            );
        }

        // ================= AI PAYLOAD =================
        const aiPayload = {
            gender: finalUser.gender,
            age: finalUser.age,
            height: finalUser.height,
            weight: finalUser.weight,
            mealsPerDay: finalUser.mealsPerDay,
            allergies: finalUser.allergies,
            goal: finalUser.goal,
            healthCondition: finalUser.healthCondition,
            healthNotes: finalUser.healthNotes,
            activityLevel: finalUser.activityLevel,
            dietType: finalUser.dietType,

            calories: nutritionData.calories,
            proteins: nutritionData.proteins,
            carbs: nutritionData.carbs,
            fats: nutritionData.fats
        };

        const result = await aiRecommendMeals(aiPayload);

        if (!result || !Array.isArray(result.recommendations)) {
            return res.status(502).json({
                success: false,
                message: "AI service failed"
            });
        }

        // ================= FOOD MAPPING =================
        const foods = await Food.find({}, { name: 1 });

        const foodMap = new Map(
            foods.map(f => [f.name.toLowerCase(), f._id])
        );

        const recommendationsWithIds = result.recommendations.map(item => {
            const foodId = foodMap.get(item.name?.toLowerCase());

            return {
                ...item,
                FoodDetails: foodId || null
            };
        });

        const safeMeals = recommendationsWithIds.filter(m => m.FoodDetails);

        // ================= SAVE MEALS =================
        await Meal.create({
            userId: req.user.id,
            meals: safeMeals.map(m => ({
                FoodDetails: m.FoodDetails,
                score: m.score
            })),
            goal: finalUser.goal,
            daily_targets: result.daily_targets,
            meal_target: result.meal_target
        });

        return res.status(200).json({
            success: true,
            message: "Recommendations fetched successfully",
            data: {
                ...result,
                recommendations: recommendationsWithIds
            }
        });

    } catch (error) {
        console.log("Recommend Meals Error:", error);

        return res.status(500).json({
            success: false,
            message: "AI Server Error"
        });
    }
};


// ================= GET MEALS =================
export const getMeals = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const meals = await Meal.find({ userId: req.user.id })
            .populate("meals.FoodDetails")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: meals
        });

    } catch (error) {
        console.log("Get Meals Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch meals"
        });
    }
};



// import { recommendMeals as aiRecommendMeals } from "../services/ai_service.js";
// import Meal from "../models/meal_model.js";
// import Food from "../models/food_model.js";
// import User from "../models/user_model.js";
// import { calculateNutrition } from "../services/nutrition_calculator.js";

// export const recommendMeals = async (req, res) => {
//     try {
//         const userData = req.body;

//         if (!req.user?.id) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized"
//             });
//         }

//         const dbUser = await User.findById(req.user.id);

//         if (!dbUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         // ================= MERGE DATA =================
//         const finalUser = {
//             ...dbUser.toObject(),
//             ...userData
//         };

//         // ================= VALIDATION FIRST =================
//         if (
//             !finalUser.gender ||
//             !finalUser.age ||
//             !finalUser.height ||
//             !finalUser.weight ||
//             !finalUser.activityLevel ||
//             !finalUser.goal
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please complete your profile first"
//             });
//         }

//         if (!userData) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User data is required"
//             });
//         }

//         // ================= SAVE PROFILE =================
//         await User.findByIdAndUpdate(
//             req.user.id,
//             {
//                 $set: {
//                     gender: finalUser.gender,
//                     age: finalUser.age,
//                     height: finalUser.height,
//                     weight: finalUser.weight,
//                     activityLevel: finalUser.activityLevel,
//                     goal: finalUser.goal,
//                     mealsPerDay: finalUser.mealsPerDay,
//                     allergies: finalUser.allergies,
//                     healthCondition: finalUser.healthCondition, // <-- أضيفي السطر ده
//                     healthNotes: finalUser.healthNotes,
//                     dietType: finalUser.dietType,

//                     // مهم جدًا
//                     profileCompleted: true
//                 }
//             }
//         );

//         let nutritionData;

//         // ================= AUTO MODE =================
//         if (userData.mode === "auto") {

//             nutritionData = calculateNutrition(finalUser);

//             await User.findByIdAndUpdate(
//                 req.user.id,
//                 {
//                     $set: {
//                         calories: nutritionData.calories,
//                         proteins: nutritionData.proteins,
//                         carbs: nutritionData.carbs,
//                         fats: nutritionData.fats
//                     }
//                 }
//             );
//         }

//         // ================= MANUAL MODE =================
//         else {
//             nutritionData = {
//                 calories: userData.calories,
//                 protein: userData.protein,
//                 carbs: userData.carbs,
//                 fats: userData.fats
//             };
//         }

//         // ================= AI PAYLOAD =================
//         const aiPayload = {
//             gender: finalUser.gender,
//             age: finalUser.age,
//             height: finalUser.height,
//             weight: finalUser.weight,
//             mealsPerDay: finalUser.mealsPerDay,
//             allergies: finalUser.allergies,
//             goal: finalUser.goal,
//              healthCondition: finalUser.healthCondition,
//             healthNotes: finalUser.healthNotes,
//             activityLevel: finalUser.activityLevel,
//             dietType: finalUser.dietType,

//             calories: nutritionData.calories,
//             protein: nutritionData.proteins,
//             carbs: nutritionData.carbs,
//             fats: nutritionData.fats
//         };

//         const result = await aiRecommendMeals(aiPayload);

//         if (!result || !Array.isArray(result.recommendations)) {
//             return res.status(502).json({
//                 success: false,
//                 message: "AI service failed"
//             });
//         }

//         // ================= FOOD MAPPING =================
//         const foods = await Food.find({}, { name: 1 });

//         const foodMap = new Map(
//             foods.map(f => [f.name.toLowerCase(), f._id])
//         );

//         const recommendationsWithIds = result.recommendations.map(item => {
//             const foodId = foodMap.get(item.name?.toLowerCase());

//             return {
//                 ...item,
//                 FoodDetails: foodId || null
//             };
//         });

//         const safeMeals = recommendationsWithIds.filter(m => m.FoodDetails);

//         // ================= SAVE MEALS =================
//         await Meal.create({
//             userId: req.user.id,
//             meals: safeMeals.map(m => ({
//                 FoodDetails: m.FoodDetails,
//                 score: m.score
//             })),
//             goal: finalUser.goal,
//             daily_targets: result.daily_targets,
//             meal_target: result.meal_target
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Recommendations fetched successfully",
//             data: {
//                 ...result,
//                 recommendations: recommendationsWithIds
//             }
//         });

//     } catch (error) {
//         console.log("Recommend Meals Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "AI Server Error"
//         });
//     }
// };


// // ================= GET MEALS =================
// export const getMeals = async (req, res) => {
//     try {
//         if (!req.user?.id) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized"
//             });
//         }

//         const meals = await Meal.find({ userId: req.user.id })
//             .populate("meals.FoodDetails")
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             success: true,
//             data: meals
//         });

//     } catch (error) {
//         console.log("Get Meals Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch meals"
//         });
//     }
// };
