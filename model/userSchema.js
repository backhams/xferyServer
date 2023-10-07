
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shippingCustomerName: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  shippingCountry: {
    type: String,
  },
  shippingCountryCode: {
    type: String,
  },
  shippingProvince: {
    type: String,
  },
  shippingCity: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
  shippingZip: {
    type: String,
  },
  houseNumber: {
    type: String,
  },
  remark: {
    type: String,
  },
  addToCard: [String],
});

const userPaymentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  variantId: {
    type: String,
    required: true,
  },
  orderNum: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userOrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  variantImage: {
    type: String,
    required: true,
  },
  productName:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userFeedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  emoji:{
    type:String,
  },
  textBox:[String],
  message:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("User", userSchema);
const userPayment = mongoose.model("UserPayment", userPaymentSchema);
const orders = mongoose.model("UserOrders", userOrderSchema);
const userFeedback = mongoose.model("UserFeedback", userFeedbackSchema);

module.exports = { user, userPayment, orders, userFeedback };
