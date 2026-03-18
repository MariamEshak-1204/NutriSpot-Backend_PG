import Joi from "joi";

export const foodValidation = Joi.object({
  name: Joi.string().trim().min(2).required(),

  ingredients: Joi.array()
    .items(Joi.string().trim().required())
    .min(1)
    .required(),

  image: Joi.string().uri().required(),

  price: Joi.number().positive().required(),

  discount: Joi.number().min(0).max(100),

  time: Joi.number().positive().required(),

  calories: Joi.number().positive().required(),

  protein: Joi.number().min(0).required(),

  carbs: Joi.number().min(0).required(),

  fats: Joi.number().min(0).required(),

  categories: Joi.array()
    .items(
      Joi.string().valid("salad", "meal", "sandwich")
    )
    .min(1)
    .required(),

  health: Joi.array()
    .items(
      Joi.string().valid("high blood pressure", "heart disease" , "diabetes")
    )
    .optional(),

  diet: Joi.array()
    .items(
      Joi.string().valid("vegan", "keto", "low carb" , "high protein")
    )
    .optional(),

  allergy: Joi.array()
    .items(
      Joi.string().valid("none" ,"nuts", "gluten", "lactose")
    )
    .optional()
});
