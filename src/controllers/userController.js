import * as User from '../Models/userModel.js';

export const create = async (c) => {
	const body = await c.req.json();

	if (!body) {
		return c.json({ message: 'Invalid payload' }, 400);
	}
	if (!body.email || !body.name || !body.age || !body.password) {
		return c.json({ message: 'Name and email are required' }, 400);
	}

	const isEmailExist = await User.checkEmailExist(c, body.email);
	if (isEmailExist.results.length > 0) {
		return c.json({ message: 'Email already exist' }, 400);
	}

	const result = await User.create(c, body);
	return c.json(
		{
			success: true,
			id: result.meta.last_row_id,
		},
		201,
	);
};

export const index = async (c) => {
	const result = await User.getAllUser(c);
	return c.json({
		success: true,
		data: result.results,
	});
};

export const show = async (c) => {};

export const update = async (c) => {};

export const destroy = async (c) => {};
