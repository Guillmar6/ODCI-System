const express = require('express');

const router = express.Router();

router.get('/dashboard', async function(req, res, next) {
    res.render('admin/mainBody', { currentNav: 'dashboard'});
});
router.get('/reports-analytics', async function(req, res, next) {
    res.render('admin/mainBody', { currentNav: 'reports-analytics'});
});
router.get('/activity-logs', async function(req, res, next) {
    res.render('admin/mainBody', { currentNav: 'activity-logs'});
});
router.get('/tickets', async function(req, res, next) {
    res.render('admin/mainBody', { currentNav: 'tickets'});
});
router.get('/account-management', async function(req, res, next) {
    res.render('admin/mainBody', { currentNav: 'account-management'});
});

module.exports = router;