import express from "express"
import { connectDB } from "./config/db.js"
import mongoose from "mongoose"
import Product from "./models/product.model.js";

const app = express();

// Middleware
app.use(express.json()); // allows JSON data in the req.body

// Routes
app.get('/', (req, res) => {
  res.send('Server is ready');
})

// get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('Error getting products:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
})

// create product
app.post('/api/products', async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" })
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
})

// update product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product id' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
})

// delete product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(404).json({ success: false, message: 'Product for deletion not found' });
  }
})

// start server and connect to MongoDB
app.listen(5000, () => {
  connectDB()
  console.log('Server started at http://localhost:5000');
})