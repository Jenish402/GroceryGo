import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import Product from '../models/Product.js'; // Assuming the Product model is imported

const productRouter = express.Router();

// Add a new product
productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);

// Fetch list of products with optional category filter
productRouter.get('/list', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// Get product by id
productRouter.get('/id', productById);

// Change product stock
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
