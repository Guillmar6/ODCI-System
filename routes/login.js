var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  const values = req.query;
  res.render('login', {
    title: values.title,
    error: values.error, 
    username_email: values.username_email, 
    password: values.password 
  });
});

module.exports = router;
