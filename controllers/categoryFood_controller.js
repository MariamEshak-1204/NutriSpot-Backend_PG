import Food from "../models/food_model.js"


// categories: ["salad", "meal", "sandwich"]

export const getFoodByCategory = async (req, res) => {

  try {

    const category = req.params.category

    const foods = await Food.find({ categories: category }).select("name price image calories categories")

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

//    health: ["high blood pressure", "heart disease" , "diabetes"]


export const getFoodByHealth = async (req, res) => {

  try {

    const category = req.params.category

    const foods = await Food.find({ health: category }).select("name price image calories health")

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

//   diet: ["vegan", "keto", "low carb" , "high protein"]

export const getFoodByDiet = async (req, res) => {

  try {

    const category = req.params.category

    const foods = await Food.find({ diet: category }).select("name price image calories diet")

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}


//    allergy: [ "none" ,"nuts", "gluten", "lactose"]


export const getFoodByAllergy = async (req, res) => {

  try {

    const category = req.params.category

    const foods = await Food.find({ allergy: category }).select("name price image calories allergy")

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      count: foods.length,
      data: foods
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

