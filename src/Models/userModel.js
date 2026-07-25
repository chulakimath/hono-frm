import * as hashService from '../services/hashService.js';
export const create = async (c, body) => {
	const { name, email, age, password } = body;
	const hashedPassword = await hashService.hashPassword(password);

	const result = await c.env.DB.prepare(
		`
        INSERT INTO users(name,email,age,password)
        VALUES(?1, ?2, ?3, ?4)
    `,
	)
		.bind(name, email, age, hashedPassword)
		.run();

	return result;
};

export const checkEmailExist = async (c, email) => {
	const result = await c.env.DB.prepare(`SELECT * FROM users WHERE email = ?1`).bind(email).all();
	return result;
};
export const getAllUser = async (c) => {
	const result = await c.env.DB.prepare(`SELECT * FROM users`).all();
	return result;
};
export const update = async (c) => {
	return '';
};
export const destroy = async (c) => {
	return '';
};

export const getUserById = async (c) => {
	const { id } = c.req.param();
	const result = await c.env.DB.prepare(`SELECT * FROM users WHERE id = ?1`).bind(id).all();
	return result;
};

export const getUserByEmail = async (c, email) => {
	const result = await c.env.DB.prepare(`SELECT * FROM users WHERE email = ?1`).bind(email).all();
	return result;
};
