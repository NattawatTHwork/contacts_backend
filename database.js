require('dotenv').config()
const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'contacts'
// });
const connection = mysql.createConnection(process.env.DATABASE_URL);

module.exports = connection;
