import express from "express"
import { connectDB } from "./config/db.js"

const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Server is ready');
})

app.get('/products', (req, res) => {
  res.send('products');
})

// start server and connect to MongoDB
app.listen(5000, () => {
  connectDB()
  console.log('Server started at http://localhost:5000');
})