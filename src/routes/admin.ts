import { Router } from 'express';
import { signup, signin } from '../controllers/AdminController';

const router: Router = Router();

router.post('/admin/signup', signup);
router.post('/admin/signin', signin);

export default router;
