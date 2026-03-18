import mongoose from "mongoose"
import Food from "../models/food_model.js"

export const getFoodDetails = async (req, res) => {
  try {

    const { id } = req.params

    // نتأكد إن الـ id صح
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Food ID"
      })
    }

    const food = await Food.findById(id).select("-discount -categories -health -diet -allergy")

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      })
    }

    res.status(200).json({
      success: true,
      data: food
    })

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    })
  }
}
