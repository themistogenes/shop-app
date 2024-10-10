import express from "express"

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js"

const router = express.Router();

// get all products
// GET: /api/products
router.get('/', getProducts);

// create product
// POST: /api/products
router.post('/', createProduct);

// update product
// PUT: /api/products/:idT
router.put('/:id', updateProduct)

// delete product
// DELETE: /api/products/:id
router.delete('/:id', deleteProduct)

export default router