import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
	return c.env.ASSETS.fetch(c.req.raw);
});

app.get('/api', (c) => {
	return c.json({
		success: true,
		framework: 'Hono',
		runtime: 'Cloudflare Workers',
	});
});

export default app;
