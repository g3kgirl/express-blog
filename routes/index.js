var express = require('express');
var router = express.Router();
var fs = require('fs');
const { json } = require('body-parser');
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog'
})

connection.connect()


var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'your_database_user',
    password: '123456',
    database: 'blog'
  }
});



// connection.end()

/* GET home page. */

router.get('/', function (req, res, next) {

  connection.query('SELECT * FROM posts ORDER BY created_on DESC;', function (err, rows, fields) {
    if (err) throw err

    // console.log('The solution is: ', rows, fields)
    var posts = rows;
    var filedata = fs.readFileSync('data.json');

    var data = JSON.parse(filedata);

    var { name } = data;

    res.render('index', {
      title: 'Express',
      name,
      posts
    });

  })

  // var data = require('./data.json');

});

router.post('/create', function (req, res, next) {

  const { title, body } = req.body;


  const post = { title, body };

  connection.query('INSERT INTO posts SET ?', post, function (err, rows) {
    console.log(err);
    res.status(302).redirect('/');
  })


  // const oldData = require('./data.json');

  // var filedata = fs.readFileSync('data.json');
  // var oldData = JSON.parse(filedata);

  // const { posts } = oldData;

  // const newPosts = [post, ...posts];

  // oldData.posts = newPosts;

  // let data = JSON.stringify(oldData, null, 2);

  // fs.writeFile('data.json', data, (err, data) => {
  //   console.log(err, data);
  //   res.status(302).redirect('/');
  // });


})

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
