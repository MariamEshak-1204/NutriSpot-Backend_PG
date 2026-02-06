import Joi from "joi";


// Register Validation

export const userValidation = Joi.object({
    userName: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(8).required(),
    profileImage: Joi.string().optional(),
    role: Joi.string().optional(),
});


// Login Validation

export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


// Profile Setup Validation
export const profileValidation = Joi.object({
    gender: Joi.string().valid("male", "female").optional(),

    age: Joi.number().min(10).max(100).optional(),

    height: Joi.number().min(100).max(250).optional(),

    weight: Joi.number().min(30).max(300).optional(),

    mealsPerDay: Joi.number().valid(2, 3).optional(),

    allergies: Joi.array().items(
        Joi.string().valid("Diabetes", "Lactose", "Gluten", "Nuts", "None")
    ).optional(),

    goal: Joi.string().valid(
        "Lose weight",
        "Gain weight",
        "Improve health",
        "Maintain weight",
        "Build muscle"
    ).optional(),

    sleepingQuality: Joi.string()
        .valid("Excellent", "Good", "Fair", "Poor")
        .optional(),

    healthNotes: Joi.string().allow("").optional(),

    activityLevel: Joi.string()
        .valid("Sedentary", "Light", "Moderate", "High")
        .optional(),

    dietType: Joi.string()
        .valid("High protein", "Vegan", "Low carb", "Keto")
        .optional(),

    calories: Joi.number().min(1500).max(2500).optional(),

    proteins: Joi.number().min(40).max(200).optional(),

    carbs: Joi.number().min(130).max(300).optional(),

    fats: Joi.number().min(30).max(100).optional(),

});
