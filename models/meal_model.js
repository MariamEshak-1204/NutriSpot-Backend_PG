
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    meals: [
        {
            name: String,
            calories: Number,
            protein: Number,
            carbs: Number,
            fat: Number,
        }
    ],

    goal: {
        type: String
    }

}, {
    timestamps: true
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
