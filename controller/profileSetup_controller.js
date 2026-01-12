import asyncHandler from "express-async-handler";
import User from "../models/user_model.js";


export const profileSetup = asyncHandler(async (req, res) => {

    // 1️⃣ Get logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // 2️⃣ Destructure body
    const {
        gender,
        age,
        height,
        weight,
        mealsPerDay,
        allergies,
        goal,
        sleepingQuality,
        healthNotes,
        activityLevel,
        dietType,
        calories,
        proteins,
        carbs,
    } = req.body;

    // 3️⃣ Update fields (safe update)
    user.gender = gender ?? user.gender;
    user.age = age ?? user.age;
    user.height = height ?? user.height;
    user.weight = weight ?? user.weight;
    user.mealsPerDay = mealsPerDay ?? user.mealsPerDay;
    user.allergies = allergies ?? user.allergies;
    user.goal = goal ?? user.goal;
    user.sleepingQuality = sleepingQuality ?? user.sleepingQuality;
    user.healthNotes = healthNotes ?? user.healthNotes;
    user.activityLevel = activityLevel ?? user.activityLevel;
    user.dietType = dietType ?? user.dietType;
    user.calories = calories ?? user.calories;
    user.proteins = proteins ?? user.proteins;
    user.carbs = carbs ?? user.carbs;

    // 4️⃣ Mark profile as completed
    user.profileCompleted = true;

    // 5️⃣ Save user
    const updatedUser = await user.save();

    // 6️⃣ Response
    res.status(200).json({
        status: "success",
        message: "Profile setup completed successfully",
        user: updatedUser,
    });
});


export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        status: "success",
        user
    });
});