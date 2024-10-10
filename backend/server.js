import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import productRoutes from './routes/product.route.js';

dotenv.config(); // allow access to process.env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // allow JSON data in the req.body

// Routes
app.use('/api/products', productRoutes); // product routes

app.get('/', (req, res) => {
  res.send('Server is ready');
})

// start server and connect to MongoDB
app.listen(PORT, () => {
  connectDB()
  console.log('Server started at http://localhost:' + PORT);
})