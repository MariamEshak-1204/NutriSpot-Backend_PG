import asyncHandler from "express-async-handler";
import Food from "../models/food_model.js";



export const searchFood = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        status: "fail",
        message: "keyword is required",
      });
    }

    const foods = await Food.find({
      name: { $regex: keyword, $options: "i" },
    });

    res.status(200).json({
      status: "success",
      results: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


export const getFoodOffers = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : null;

    let query = Food.find({ discount: { $gt: 0 } });

    if (limit) {
      query = query.limit(limit);
    }

    const foods = await query;

    res.status(200).json({
      status: "success",
      results: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


export const getHomeFoods = async (req, res) => {
  const foods = await Food.aggregate([
    { $sample: { size: 10 } }
  ]);

  res.status(200).json({
    status: "success",
    count: foods.length,
    data: foods
  });
};

export const getAllFoods = asyncHandler(async (req, res) => {
    const user = req.user; // جاية من middleware
    // مثال بسيط: نجيب كل الأكلات 
    // See All
    const foods = await Food.find();

    res.status(200).json({
        success: true,
        count: foods.length,
        foods,
    });

    if (!user) {
    res.status(401);
    throw new Error("User not authenticated");}
});
