
import { recommendMeals as aiRecommendMeals } from "../services/ai_service.js";
import Meal from "../models/meal_model.js";

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
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;

        const result = await aiRecommendMeals(userData);

        if (!result) {
            return res.status(502).json({
                success: false,
                message: "AI service failed"
            });
        }

        // const meal = await Meal.create({
        //     userId,
        //     meals: Array.isArray(result?.recommendations)
        //         ? result.recommendations
        //         : [],
        //     goal: userData.goal
        // });

        const meal = await Meal.create({
            userId,
            meals: result.recommendations || [],
            goal: userData.goal,

            daily_targets: result.daily_targets,
            meal_target: result.meal_target
        });

        return res.status(200).json({
            success: true,
            message: "Recommendations fetched successfully",
            data: result
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
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;

        const meals = await Meal.find({ userId })
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