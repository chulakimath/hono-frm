import { Hono } from 'hono';
import * as AUthController from '../controllers/authController.js';
import { AuthCheck } from '../middleware/AuthCheck.js';

const router = new Hono();
router.post('/', AUthController.login);
router.get('/me', AuthCheck, AUthController.me);

export default router;
