var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    name: 'Shikha',
    posts: [
      { title: "Title of your post", body: "This is your post" },
      { title: "Title of your post 2", body: "This is your post 2" },
    ]
  });

});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
