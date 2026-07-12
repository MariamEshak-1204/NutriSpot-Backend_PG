
// node seedFoods.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

import Food from "./models/food_model.js";

dotenv.config();

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("📡 MongoDB connected");

   
    const foodsData = JSON.parse(
      fs.readFileSync("./data/foods.json", "utf-8")
    );

   
    await Food.deleteMany();

      
    await Food.insertMany(foodsData);

    console.log("✅ Foods seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedFoods();
