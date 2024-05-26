const db = require('../config/db');

const Modality = {
  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM modalities WHERE id = ?', [id]);
    return rows[0];
  },
  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM modalities');
    return rows;
  }
};

module.exports = Modality;

