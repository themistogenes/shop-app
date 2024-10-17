import express from "express"
import dotenv from "dotenv"
import path from "path"
import { connectDB } from "./config/db.js"
import productRoutes from './routes/product.route.js';

dotenv.config(); // allow access to process.env

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(express.json()); // allow JSON data in the req.body

// Routes
app.use('/api/products', productRoutes); // product routes

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// })

// check for environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

// start server and connect to MongoDB
app.listen(PORT, () => {
  connectDB()
  console.log('Server started at http://localhost:' + PORT);
})