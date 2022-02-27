import { Router } from 'express';
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer
} from '../controllers/CustomerController';
import { TokenValidation } from '../validators/verifyToken';

const router: Router = Router();

router.post('/customer', TokenValidation, createCustomer);
router.delete('/customer/:id', TokenValidation, deleteCustomer);
router.get('/customer/:id', TokenValidation, getCustomer);
router.get('/customer', TokenValidation, getCustomers);
router.put('/customer/:id', TokenValidation, updateCustomer);

export default router;
