import express from "express"
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartController.js";


const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart)
// backend/routes/categoryRoute.js
cartRouter.get('/list', async (req, res) => {
    res.json({
      success: true,
      categories: ['Fruits', 'Vegetables', 'Dairy', 'Snacks'],
    });
  });

export default cartRouter;