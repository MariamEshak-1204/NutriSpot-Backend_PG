import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    meals: [
      {
        _id: false,

        FoodDetails: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true
        },

        score: {
          type: Number,
          required: true
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
  },
  {
    timestamps: true
  }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;