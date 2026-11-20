const express = require('express');

const router = express.Router();

router.get('/', async function(req, res, next) {
    const view = req.query.view;
    res.render('admin/mainBody', {
        currentNav: req.query.view,
        profileName: req.user.admin_name,
        role: req.user.role
    });
});
router.get('/dashboard', async function(req, res, next) {
    res.render('admin/mainBody', { 
        currentNav: 'dashboard',
        profileName: req.user.admin_name,
        role: req.user.role
    });
});
router.get('/reports-analytics', async function(req, res, next) {
    res.render('admin/mainBody', { 
        currentNav: 'reports-analytics',
        profileName: req.user.admin_name,
        role: req.user.role
    });
});
router.get('/activity-logs', async function(req, res, next) {
    res.render('admin/mainBody', { 
        currentNav: 'activity-logs',
        profileName: req.user.admin_name,
        role: req.user.role
    });
});
router.get('/tickets', async function(req, res, next) {
    res.render('admin/mainBody', { 
        currentNav: 'tickets',
        profileName: req.user.admin_name,
        role: req.user.role
    });
});
router.get('/account-management', async function(req, res, next) {
    res.render('admin/mainBody', { 
        currentNav: 'account-management',
        profileName: req.user.admin_name,
        role: req.user.role
    });
});

module.exports = router;