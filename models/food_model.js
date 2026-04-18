
import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients: [{type: String, required: true}],
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discount: {type: Number, default: 0 },
    time: { type: Number, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },

    categories: {
       type: [String], 
       enum: ["salad", "meal", "sandwich" , "soup" , "snack"], 
       required: true 
      },

    health: { 
      type: [String], 
      enum: ["high blood pressure", "heart disease" , "diabetes" , "none"],
      required: true  

    },
    diet: { 
      type: [String], 
      enum: ["vegan", "keto", "low carb" , "high protein"],
      required: true  
    },
    allergy: { 
      type: [String], 
      enum: [ "none" ,"nuts", "gluten", "lactose"],
      required: true 
     },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
export default Food;
