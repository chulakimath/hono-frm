import { Hono } from 'hono';
import * as AuthController from '../controllers/authController.js';
import { AuthCheck } from '../middleware/authCheck.js';

const router = new Hono();
router.post('/', AuthController.login);
router.get('/me', AuthCheck, AuthController.me);

export default router;
