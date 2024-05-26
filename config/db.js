const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'beach_players_adm',
  password: process.env.DB_PASSWORD || 'mewtwo',
  database: process.env.DB_NAME || 'beach_players'
});

module.exports = pool.promise();