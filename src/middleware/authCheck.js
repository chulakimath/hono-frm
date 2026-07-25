import { verify } from 'hono/jwt';
export const authCheck = async (c, next) => {
	const token = c.req.header('Authorization');
	if (!token) {
		return c.json({ message: 'Authorization header is required' }, 401);
	}
	const tokenWithoutPrefix = token.replace('Bearer ', '');
	const decodedToken = await verify(tokenWithoutPrefix, c.env.JWT_SECRET, 'HS256');
	if (!decodedToken) {
		return c.json({ message: 'Invalid token' }, 401);
	}
	c.set('user', decodedToken);
	await next();
};
