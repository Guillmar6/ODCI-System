require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');

const router = express.Router();

// Send Email message
const emailMessage = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SUPER_ADMIN_EMAIL,
        pass: process.env.SUPER_ADMIN_EMAIL_PASSWORD
    }
});
router.post('/sendEmailMessage', async function(req, res, next) {
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

module.exports = router;