import Cart from "../models/cart_model.js"
import Order from "../models/order_model.js"

export const checkout = async (req, res) => {
  try {

    const { paymentMethod, cardDetails } = req.body

    const allowedMethods = ["cash", "card", "vodafone", "orange", "etisalat"]

    if (!allowedMethods.includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" })
    }

    //  لو الدفع كارت لازم بيانات الكارت
    if (paymentMethod === "card") {

      if (!cardDetails) {
        return res.status(400).json({ message: "Card details are required" })
      }

      const { cardholderName, cardNumber, expiryDate, cvv } = cardDetails

      if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ message: "All card fields are required" })
      }

      if (cardNumber.length !== 16) {
        return res.status(400).json({ message: "Invalid, Card number must be exactly 16 digits" })
      }

      if (cvv.length !== 3) {
        return res.status(400).json({ message: "Invalid, CVV must be exactly 3 digits" })
      }
    }

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.food")

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    //  تحديد حالة الدفع
    let paymentStatus = paymentMethod === "cash" ? "pending" : "paid"

    const newOrder = await Order.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        food: item.food._id,
        quantity: item.quantity,
        price: item.food.price
      })),
      totalPrice: cart.totalPrice,
      paymentMethod,
      paymentStatus,
      transactionId: paymentStatus === "paid" ? "TXN" + Date.now() : null
    })

    // 🗑️ فضي الكارت
    cart.items = []
    cart.totalPrice = 0
    await cart.save()

    res.status(201).json({
      success: true,
      order: newOrder
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}




// import Cart from "../models/cart_model.js"
// import Order from "../models/order_model.js"

// export const checkout = async (req, res) => {
//   try {

//     const { paymentMethod } = req.body

//     const allowedMethods = ["cash", "card", "vodafone", "orange", "etisalat"]

//     if (!allowedMethods.includes(paymentMethod)) {
//       return res.status(400).json({ message: "Invalid payment method" })
//     }

//     const cart = await Cart.findOne({ user: req.user._id })
//       .populate("items.food")

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" })
//     }

//     let paymentStatus = paymentMethod === "cash" ? "pending" : "paid"

//     const newOrder = await Order.create({
//       user: req.user._id,
//       items: cart.items.map(item => ({
//         food: item.food._id,
//         quantity: item.quantity,
//         price: item.food.price
//       })),
//       totalPrice: cart.totalPrice,
//       paymentMethod,
//       paymentStatus,
//       transactionId: paymentStatus === "paid" ? "TXN" + Date.now() : null
//     })

//     // فضي الكارت
//     cart.items = []
//     cart.totalPrice = 0
//     await cart.save()

//     res.status(201).json({ success: true, order: newOrder })

//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }