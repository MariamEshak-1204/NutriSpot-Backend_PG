import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    meals: [
        {
            name: {
                type: String
            },

            ingredients: {
                type: [String],
                default: []
            },

            image: {
                type: String
            },

            price: {
                type: Number
            },

            discount: {
                type: Number
            },

            time: {
                type: Number
            },

            calories: {
                type: Number
            },

            protein: {
                type: Number
            },

            carbs: {
                type: Number
            },

            fats: {
                type: Number
            },

            categories: {
                type: [String],
                default: []
            },

            health: {
                type: [String],
                default: []
            },

            diet: {
                type: [String],
                default: []
            },

            allergy: {
                type: [String],
                default: []
            },

            diseases: {
                type: [String],
                default: []
            },

            score: {
                type: Number
            }
        }
    ],

    goal: {
        type: String
    },

    daily_targets: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number
    },

    meal_target: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number
    }

}, {
    timestamps: true
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;