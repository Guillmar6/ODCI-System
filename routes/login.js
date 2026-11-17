var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  const values = req.body;
  res.render('login', {});
});

router.get('/admin/login', function(req, res, next) {
  const values = req.body;
  res.render('adminLogin', {});
});

module.exports = router;
