 import Food from "../models/food_model.js"


   // categories: ["salad", "meal", "sandwich"]
export const getFoodByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "category is required",
      });
    }

    const foods = await Food.find({
      categories: { $regex: category, $options: "i" }
    }).select("name price image calories categories");

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//    health: ["high blood pressure", "heart disease" , "diabetes"]

export const getFoodByHealth = async (req, res) => {
  try {
    const { health } = req.query;

    if (!health) {
      return res.status(400).json({
        success: false,
        message: "health is required",
      });
    }

    const foods = await Food.find({
      health: { $regex: health, $options: "i" }
    }).select("name price image calories health");

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//   diet: ["vegan", "keto", "low carb" , "high protein"]

export const getFoodByDiet = async (req, res) => {
  try {
    const { diet } = req.query;

    if (!diet) {
      return res.status(400).json({
        success: false,
        message: "diet is required",
      });
    }

    const foods = await Food.find({
      diet: { $regex: diet, $options: "i" }
    }).select("name price image calories diet");

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

 //    allergy: [ "none" ,"nuts", "gluten", "lactose"]
 
export const getFoodByAllergy = async (req, res) => {
  try {
    const { allergy } = req.query;

    if (!allergy) {
      return res.status(400).json({
        success: false,
        message: "allergy is required",
      });
    }

    const foods = await Food.find({
      allergy: { $regex: allergy, $options: "i" }
    }).select("name price image calories allergy");

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


