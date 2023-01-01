const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "employees",
});

connection.connect();

connection.query("SELECT * FROM employees", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();
