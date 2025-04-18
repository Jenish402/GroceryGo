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
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB and Cloudinary
await connectDB();
await connectCloudinary();

// CORS configuration
const whitelist = [
    'http://localhost:5173', // Remove trailing slash
    'https://grocery-go-rho.vercel.app'
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Explicitly allow credentials
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Webhook endpoint (must come before express.json())
app.post('/api/webhook', express.raw({ type: 'application/json' }), stripeWebhooks);

// Other middleware
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// Routes
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