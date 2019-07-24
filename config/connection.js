// Set up MySQL connection

var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);   
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root1',
    database: 'burger_db'
  });
};

// Make the connection

connection.connect(function(err) {
  if (err) {
    console.error('In connection.js, error connecting to database' + err.stack);
    return;
  }
  console.log(' ');
  console.log('In connection.js, connected to database with thread id ' + connection.threadId);
  console.log(' ');
});

module.exports = connection;
