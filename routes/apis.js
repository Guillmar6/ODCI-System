require('dotenv').config();
const express = require('express');
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// login api for USERS
router.post('/login', async function(req, res, next) {
    const values = req.body;
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE faculty_name=$1
        `, [values.username_email]);
        if(!result.rows[0]) return res.redirect('/login?message=Incorrect+username/email+or+password.');

        const isPasswordValid = await bcrypt.compare(values.password, result.rows[0].password);

        if(!isPasswordValid) return res.redirect(`/login?message=Incorrect+username/email+or+password.`);

        const token = jwt.sign(
            {
                id: result.rows[0].id,
                name: result.rows[0].faculty_name,
                role: result.rows[0].role
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: '1h'
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });
        
    } catch (err) {
        console.error(err);
    }
    res.redirect('/dashboard');
});

// login api for ADMINS
router.post('/admin/login', async function(req, res, next) {
    const values = req.body;
    try {
        const result = await pool.query(`
            SELECT * FROM admins WHERE admin_name='${values.username_email}'
        `);
        if(!result.rows[0]) return res.redirect(`/admin/login?message=Incorrect+username/email+or+password.`);
        
        const isPasswordValidNoHash = values.password == result.rows[0].admin_password;
        const isPasswordValidHash = await bcrypt.compare(values.password, result.rows[0].admin_password);

        if(!isPasswordValidNoHash && !isPasswordValidHash) return res.redirect(`/admin/login?message=Incorrect+username/email+or+password.`);

        const token = jwt.sign(
            {
                id: result.rows[0].id,
                admin_name: result.rows[0].admin_name,
                role: result.rows[0].role
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: '1h'
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

    } catch (err) {
        console.error(err);
    }
    res.redirect('/admin/dashboard');
});

// Logout
router.get('/logout', async function(req, res, next) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(201).json({
        message: 'Logged out successfully'
    });
});

module.exports = router;