var express = require('express');
var router = express.Router();
const pool = require('../config/db');

/* GET users listing. */
router.get('/get', async function(req, res, next) {
  try {
    const result = await pool.query(
      'SELECT users FROM users'
    );
    console.log(`Results: ${result.rows}`)
    res.send(`${result.rows}`)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
