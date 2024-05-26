const db = require('../config/db');
const jwt = require('jsonwebtoken');


const User = {
	create: async (userData) => {
		const [result] = await db.execute(
			'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
			[userData.name, userData.email, userData.password]
		);
		return result;
	},
	findByEmail: async (email) => {
		const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
		return rows[0];
	},
	findById: async (id) => {
		const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
		return rows[0];
	},
	update: async (id, userData) => {
		const [result] = await db.execute(
			'UPDATE users SET name = ?, email = ? WHERE id = ?',
			[userData.name, userData.email, id]
		);
		return result;
	},
	delete: async (id) => {
		const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
		return result;
	},
	findAll: async () => {
		const [rows] = await db.execute('SELECT * FROM users');
		return rows;
	},
	getUserLogged: (token) => {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = decoded.id;
		return user
	},
	getUserToken: (req) => {
		return req.header('Authorization').replace('Bearer ', '')
	}
};

module.exports = User;

