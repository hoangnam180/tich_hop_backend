// // get the client
const sql = require('mssql/msnodesqlv8'); // MS Sql Server client
const mysql = require('mysql2/promise');

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'payroll',
});
const sqlServerConfig = {
  server: 'ADMIN\\SQLEXPRESS',
  database: 'HR',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
  },
};
sql.connect(sqlServerConfig, function (err) {
  try {
    if (err) {
      console.log('err', err);
    } else {
      console.log('connected');
    }
  } catch (err) {
    console.log(err);
  }
});
const conn = new sql.Request();
module.exports = {
  pool,
  conn,
};
