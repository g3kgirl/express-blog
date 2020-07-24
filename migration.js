var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog'
})

connection.connect()

connection.query(`CREATE TABLE  posts ( id INT auto_increment PRIMARY KEY, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, title TEXT, body TEXT );`, function (err, rows) {
  console.log(err, rows);
})

connection.query(`INSERT INTO posts (title, body) VALUES ('test title', 'test body of post')`, function (err, rows) {
  console.log(err, rows);
})

connection.end()
