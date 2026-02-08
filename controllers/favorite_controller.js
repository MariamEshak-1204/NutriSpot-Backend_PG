import User from "../models/user_model.js";

// Add To Favorite

export const addToFavorite = async (req, res) => {
  const userId = req.user._id;
  const { foodId } = req.body;

  const user = await User.findById(userId);

  if (user.favorites.includes(foodId)) {
    return res.status(400).json({
      message: "Food already in favorites",
    });
  }

  user.favorites.push(foodId);
  await user.save();

  res.status(200).json({
    message: "Added to favorites",
  });
};

//  Remove From Favorite

export const removeFromFavorite = async (req, res) => {
  const userId = req.user._id;
  const { foodId } = req.body;

  await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: foodId } }
  );

  res.status(200).json({
    message: "Removed from favorites",
  });
};


// Get Favorites

export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("favorites");

  res.status(200).json({
    favorites: user.favorites,
  });
};
