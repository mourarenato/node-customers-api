import { Router } from 'express';
import {
  createProduct,
  getProduct,
  getProducts
} from '../controllers/ProductController';
import { TokenValidation } from '../validators/verifyToken';

const router: Router = Router();

router.post('/product', TokenValidation, createProduct);
router.get('/product/:id', TokenValidation, getProduct);
router.get('/product', TokenValidation, getProducts);

export default router;
