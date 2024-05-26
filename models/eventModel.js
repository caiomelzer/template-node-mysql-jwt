const db = require('../config/db');

const Event = {
	create: async (eventData) => {
		const [result] = await db.execute(
			'INSERT INTO events (name, organizer_id, start_at, end_at, category_id, modality_id) VALUES(?, ?, ?, ?, ?, ?);',
			[eventData.name, eventData.organizer_id, eventData.start_at, eventData.end_at, eventData.category_id, eventData.modality_id]
		);
		return result;
	},
	findAll: async (filters) => {
		let query = 'SELECT * FROM events';
		const queryParams = [];
		if (filters) {
		  const filterConditions = [];
		  if (filters.modality_id) {
			filterConditions.push('modality_id = ?');
			queryParams.push(`${filters.modality_id}`);
		  }
		  if (filterConditions.length > 0) {
			query += ' WHERE ' + filterConditions.join(' AND ');
		  }
		}
		const [rows] = await db.execute(query, queryParams);
		return rows;
	},
	findById: async (id) => {
		const [rows] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);
		return rows[0];
	}
};

module.exports = Event;

