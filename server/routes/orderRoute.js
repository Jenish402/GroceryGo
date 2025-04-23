import express from 'express';
import Stripe from 'stripe';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import Order from '../models/Order.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, stripeWebhooks } from '../controllers/orderController.js';
import { sendPaymentSuccessMail } from '../utils/mailer.js';
const orderRouter = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Routes
orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.post('/stripe', authUser, placeOrderStripe);

orderRouter.post("/success", async (req, res) => {
  console.log("hy");
  
  // try {
  //   const { email, username, orderDetails } = req.body;
  //   await sendPaymentSuccessMail(email, username, orderDetails);
  //   res.status(200).json({ message: "Payment email sent successfully!" });
  // } catch (error) {
  //   console.error("Error sending payment email:", error);
  //   res.status(500).json({ error: "Failed to send email" });
  // }
});

orderRouter.post("/create-checkout-session", async function (req, res, next) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: "cus_KudUxj75qTue5P",
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: "price_1KEoG2SHKFpjeywqDvm3EbiI", // One time pricing
          quantity: req.body.quantity,
        },
      ],
      success_url:
        "http://localhost:4900/success.html?id={CHECKOUT SESSION ID}",
      cancel_url: "http://localhost:4900/cancel.html",
    });
    res.send({ id: session.id });
  } catch (e) {
    throw new Error(e);
  }
});
// orderRouter.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error("⚠️ Webhook signature verification failed.", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       const orderId = session.metadata.orderId;

//       try {
//         const order = await Order.findById(orderId).populate("userId");
//         const user = order.userId;

//         const detailedItems = order.items.map((item) => ({
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price || item.offerPrice || 0,
//         }));

//         await sendPaymentSuccessMail(user.email, user.username, detailedItems);
//         console.log("✅ Stripe Payment Email Sent!");
//       } catch (error) {
//         console.error("❌ Error processing Stripe webhook:", error.message);
//       }
//     }

//     res.status(200).json({ received: true });
//   }
// );

export default orderRouter;
