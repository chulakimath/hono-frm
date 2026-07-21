import { Hono } from 'hono';
import userRoutes from './routes/userRoutes.js';
const app = new Hono();

app.get('/', (c) => {
	return c.env.ASSETS.fetch(c.req.raw);
});

app.route('/api/users', userRoutes);

export default app;
