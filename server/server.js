import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
import path from 'path';
import { fileURLToPath } from 'url'; // ✅ Add this

const __filename = fileURLToPath(import.meta.url); // ✅ ES module-compatible way
const __dirname = path.dirname(__filename);        // ✅ Get directory name

const app = express();
const port = process.env.PORT || 5000;

await connectDB();
await connectCloudinary();

// Allow multiple origins

const whitelist = [
  'http://localhost:5173',
  'https://grocery-go-rho.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

// const allowedOrigins = ['http://localhost:5173', 'https://grocery-go-rho.vercel.app/'];
app.post('/api/webhook', express.raw({ type: 'application/json' }), stripeWebhooks);


// Middleware
app.use("/public", express.static(path.join(__dirname, "public"))); // ✅ This works now
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send("API is Working"));

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return res.status(200).json({ success: true, message: 'Message sent successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
