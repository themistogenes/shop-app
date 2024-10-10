import express from "express"
import { connectDB } from "./config/db.js"
import productRoutes from './routes/product.route.js';

const app = express();

// Middleware
app.use(express.json()); // allows JSON data in the req.body

// Routes
app.use('/api/products', productRoutes); // product routes

app.get('/', (req, res) => {
  res.send('Server is ready');
})

// start server and connect to MongoDB
app.listen(5000, () => {
  connectDB()
  console.log('Server started at http://localhost:5000');
})