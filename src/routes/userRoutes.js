import { Hono } from 'hono';
import * as userController from '../controllers/userController.js';

const router = new Hono();
router.get('/', userController.index);
router.post('/', userController.create);

export default router;
