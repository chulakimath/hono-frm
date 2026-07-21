import { Hono } from 'hono';
import * as userController from '../controllers/userController.js';

const router = new Hono();

router.get('/', userController.index);

// router.get('/:id', async (c) => {
// 	const id = c.req.param('id');
// 	return c.json({ message: 'User details' });
// });

router.post('/', userController.create);

// router.put('/:id', (c) => {
// 	return c.json({ message: 'User updated' });
// });

// router.delete('/:id', (c) => {
// 	return c.json({ message: 'User deleted' });
// });

export default router;
