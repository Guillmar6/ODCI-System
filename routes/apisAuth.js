require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');

const pool = require('../config/db');
const { authorizedRole } = require('../config/auth');

const router = express.Router();

// Send Email message
const emailMessage = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SUPER_ADMIN_EMAIL,
        pass: process.env.SUPER_ADMIN_EMAIL_PASSWORD
    }
});
router.post('/sendEmailMessage', authorizedRole('superAdmin'), async function(req, res, next) {
    const {
        userEmail,
        subject,
        message
    } = req.body;

    try {
        await emailMessage.sendMail({
            from: `"ODCI Admin" <${process.env.SUPER_ADMIN_EMAIL}>`,
            to: userEmail,
            subject: subject,
            message: message
        });
    } catch (err) {
        console.error(err);
    }
});

// Add user account
router.post('/addNewAccount', async function(req, res, next) {
    const {
        facultyName,
        email,
        password,
        department,
        role,
        date
    } = req.body;

    var deptNum = null;
    switch (department) {
        case 'ITD':
            deptNum = 1;
            break;
        case 'TED':
            deptNum = 2;
            break;
        case 'ASD':
            deptNum = 3;
            break;
        default:
            break;
    }
    
    try {
        if(!date) {
            const result = await pool.query(`
                INSERT INTO "users"(faculty_name, email, password, department, role)
                SELECT '${facultyName}', '${email}', '${password}', '${deptNum}', '${role}'
                WHERE NOT EXISTS(
                    SELECT 1 FROM users WHERE faculty_name='${facultyName}'
                );
            `);
        } else {
            const result = await pool.query(`
                INSERT INTO "users"(faculty_name, email, password, department, role, joined_date)
                SELECT '${facultyName}', '${email}', '${password}', '${deptNum}', '${role}', '${date}'
                WHERE NOT EXISTS(
                    SELECT 1 FROM users WHERE faculty_name='${facultyName}'
                );
            `);
        }
        res.status(200).json({message: 'Account created.'});
    } catch (err) {
        console.error(err);
    }
});

// Get users list
router.post('/getUsersList', async function(req, res, next) {
    const {
        offset,
        limit,
        department
    } = req.body;

    var deptNum = null;
    switch (department) {
        case 'ITD':
            deptNum = 1;
            break;
        case 'TED':
            deptNum = 2;
            break;
        case 'ASD':
            deptNum = 3;
            break;
        default:
            deptNum = 0;
            break;
    }
console.error(`TESTING:::::${limit}::${offset}`)
    try {
        if(deptNum > 0) {
            const result = await pool.query(`
                SELECT *
                FROM users
                WHERE department=${deptNum}
                ORDER BY faculty_name ASC
                LIMIT ${limit} OFFSET ${offset};
            `);
            res.status(200).json(result.rows);
        } else {
            const result = await pool.query(`
                SELECT *
                FROM users
                ORDER BY faculty_name ASC
                LIMIT ${limit} OFFSET ${offset};
            `);
            res.status(200).json(result.rows);
        }
    } catch (err) {
        console.error(err);
    }
});

// Get departments
router.get('/getDepartments', async function(req, res, next) {
    try {
        const result = await pool.query(`
            SELECT department_name FROM departments
        `);
        res.status(200).json({departments: result.rows});
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;