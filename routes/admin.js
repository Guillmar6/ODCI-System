const express = require('express');

const router = express.Router();

router.get('/dashboard', async function(req, res, next) {
    res.render('admin/dashboard', {});
});

module.exports = router;