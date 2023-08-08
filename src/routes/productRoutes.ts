
import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import {validateCreateProduct,validateUpdateProduct} from '../middleware/validationMiddleware'
import{authenticateToken} from '../middleware/authMiddleware'

const router = express.Router();

router.post('/products',authenticateToken,validateCreateProduct, createProduct);
router.get('/products',authenticateToken, getProducts);
router.get('/products/:id',authenticateToken, getProductById);
router.put('/products/:id',authenticateToken,validateUpdateProduct, updateProduct);
router.delete('/products/:id',authenticateToken, deleteProduct);

export default router;
