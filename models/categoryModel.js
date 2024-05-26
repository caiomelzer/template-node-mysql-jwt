const db = require('../config/db');

const Category = {
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    },
    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM categories');
        return rows;
    }
};

module.exports = Category;

