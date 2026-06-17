import { recommendMeals as aiRecommendMeals } from "../services/ai_service.js";
import Meal from "../models/meal_model.js";
import Food from "../models/food_model.js";
import User from "../models/user_model.js";

export const recommendMeals = async (req, res) => {
    try {
        const userData = req.body;

        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "User data is required"
            });
        }

        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    ...userData,
                    profileCompleted: true
                }
            },
            { new: true }
        );
        console.log("UPDATED USER:", updatedUser);


        const userId = req.user.id;

        const result = await aiRecommendMeals(userData);

        if (!result || !Array.isArray(result.recommendations)) {
            return res.status(502).json({
                success: false,
                message: "AI service failed"
            });
        }

        // 🔥 Map foods from DB (name -> _id)
        const foods = await Food.find({}, { name: 1 });

        const foodMap = new Map(
            foods.map(f => [f.name.toLowerCase(), f._id])
        );

        // 🔥 clean AI recommendations + attach foodId
        const recommendationsWithIds = result.recommendations.map(aiItem => {
            const foodId = foodMap.get(aiItem.name?.toLowerCase());

            return {
                ...aiItem,
                FoodDetails: foodId || null
            };
        });

        // 🔥 remove nulls (optional)
        const safeMeals = recommendationsWithIds.filter(m => m.FoodDetails);

        // 🔥 save in DB (BUT without destroying AI response)
        await Meal.create({
            userId,
            meals: safeMeals.map(m => ({
                FoodDetails: m.FoodDetails,
                score: m.score
            })),
            goal: userData.goal,
            daily_targets: result.daily_targets,
            meal_target: result.meal_target
        });

        // 🔥 IMPORTANT: return ORIGINAL AI RESPONSE shape
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

// 📥 Get saved meals history
export const getMeals = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const userId = req.user.id;

        const meals = await Meal.find({ userId })
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