import { sign } from 'hono/jwt';
import * as User from '../Models/userModel.js';
import * as hashService from '../services/hashService.js';

export const login = async (c) => {
	const body = await c.req.json();

	if (!body || !body.email || !body.password) {
		return c.json({ message: 'Email and password are required' }, 400);
	}

	const result = await User.getUserByEmail(c, body.email);
	if (result.results.length === 0) {
		return c.json({ message: 'Invalid Email OR password' }, 404);
	}

	const user = result.results[0];

	const isPasswordValid = await hashService.comparePassword(body.password, user.password);
	if (!isPasswordValid) {
		return c.json({ message: 'Invalid Email OR password' }, 401);
	}

	const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET, 'HS256', { exp: '1d' });

	return c.json({ token });
};

export const me = async (c) => {
	try {
		const user = c.get('user');
		return c.json({
			success: true,
			data: user,
		});
	} catch (error) {
		return c.json(
			{
				success: false,
				message: 'Error fetching user data',
			},
			500,
		);
	}
};
