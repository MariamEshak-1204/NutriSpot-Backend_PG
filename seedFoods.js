
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

    // قراءة ملف JSON
    const foodsData = JSON.parse(
      fs.readFileSync("./data/foods.json", "utf-8")
    );

    // مسح القديم
    await Food.deleteMany();

    // console.log("DEBUG categories:", foodsData[0].categories);
    //     const invalidFoods = foodsData.filter(
    //   food => food.categories?.includes("breakfast")
    // );
    // console.log("❌ Foods with breakfast category:", invalidFoods);


    // إضافة الجديد
    await Food.insertMany(foodsData);

    console.log("✅ Foods seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedFoods();
