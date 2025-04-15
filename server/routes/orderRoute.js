import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';
import { sendPaymentSuccessMail } from '../utils/mailer.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/webhooks')
orderRouter.post("/payment-success", async (req, res) => {
    try {
      const { email, username, orderDetails } = req.body;
      console.log("Email sent");
      await sendPaymentSuccessMail(email, username, orderDetails);
  
      res.status(200).json({ message: "Payment email sent successfully!" });
    } catch (error) {
      console.error("Error sending payment email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

export default orderRouter;