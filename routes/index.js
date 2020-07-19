var express = require('express');
var router = express.Router();
var data = require('./data.json');
var { posts, name } = data;


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    name,
    posts
  });

});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
