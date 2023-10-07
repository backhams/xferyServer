const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = require("stripe")(process.env.STRIPE_SERVER_SECRET);
const {userPayment} = require("./model/userSchema");

//database connection
require("./db/conn");
// Enable CORS middleware with the specified options
app.use(cors({
  origin: "https://xfery.com"
}));

app.post("/webhook", express.raw({ type: "application/json" }),async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object.metadata;
    const newUserPayment = new userPayment({
      userEmail: session.userEmail,
      variantId: session.variantId,
      orderNum: session.orderNum,
      quantity: session.quantity,
      productName: session.productName,
      price: session.price,
    });
    // Save the userPayment document to the collection
    try {
      await newUserPayment.save();
    } catch (error) {
      
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

//This is to pars json file into javascript object to understand by machine
app.use(express.json());


//Connection of router file
app.use(require("./router/auth"));

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
