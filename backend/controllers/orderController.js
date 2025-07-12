import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// global variables
// const currency = 'idr'
// const deliveryCharge = 10 // fee

// gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    re.json({ success: false, message: error.message });
  }
};
// Placing orders using Stripe
const placeOrderStripe = async (req, res) => {};
// Placing orders using Stripe
const placeOrderRazorpay = async (req, res) => {};

// ALL orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// ALL orders data for forntend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from admin panel
const updateStatusOrders = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Stutus Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); 
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatusOrders,
};
