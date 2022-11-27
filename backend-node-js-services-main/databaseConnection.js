// Class to set up mySQL DB Connection
const mysql = require('mysql');
const config = require('./config.json');

const con = mysql.createConnection({
  multipleStatements:true,
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});
module.exports = con