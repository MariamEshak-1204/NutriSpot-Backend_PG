import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: Number,
      price: Number
    }
  ],

  totalPrice: Number,

  paymentMethod: {
    type: String,
    enum: ["cash", "card", "vodafone", "orange", "etisalat"],
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  transactionId: String

}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);
export default Order;

