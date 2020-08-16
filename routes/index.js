var express = require('express');
var router = express.Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var pg = require('pg');
pg.defaults.ssl = true;


var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

const Post = knex('posts');

/* GET home page. */
router.get('/', function (req, res, next) {
  knex.select()
    .table('posts')
    .orderBy('created_at', 'desc')
    .then(data => {
      res.render('index', {
        title: 'Express',
        name: 'shikha',
        posts: data
      });

    })
});

router.post('/create', function (req, res, next) {
  const { title, body } = req.body;
  const post = { title, body };
  Post
    .insert(post)
    .then(data => {
      res.status(302).redirect('/');
    })
})

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
