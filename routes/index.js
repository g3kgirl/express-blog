var express = require('express');
var router = express.Router();
var fs = require('fs');
const { json } = require('body-parser');

/* GET home page. */

router.get('/', function (req, res, next) {

  // var data = require('./data.json');
  var filedata = fs.readFileSync('data.json');
  var data = JSON.parse(filedata);

  var { posts, name } = data;

  res.render('index', {
    title: 'Express',
    name,
    posts
  });

});

router.post('/create', function (req, res, next) {

  const { title, body } = req.body;

  const post = { title, body };

  // const oldData = require('./data.json');

  var filedata = fs.readFileSync('data.json');
  var oldData = JSON.parse(filedata);

  const { posts } = oldData;

  const newPosts = [post, ...posts];

  oldData.posts = newPosts;

  let data = JSON.stringify(oldData, null, 2);

  fs.writeFile('data.json', data, (err, data) => {
    console.log(err, data);
    res.status(302).redirect('/');
  });


})

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
