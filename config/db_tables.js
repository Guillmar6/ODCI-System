const pool = require('./db');

function template(sqlCode) {
    try {
        const result = pool.query(sqlCode);
    } catch (err) {
        console.error(err);
    }
}

function users() {
    template(`
        CREATE TABLE IF NOT EXISTS "users"(
            id SERIAL PRIMARY KEY,
            faculty_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            joined_date DATE DEFAULT CURRENT_DATE
        );
    `);
}
function admins() {
    template(`
        CREATE TABLE IF NOT EXISTS "admins"(
            id SERIAL PRIMARY KEY,
            admin_name VARCHAR(255) NOT NULL,
            admin_email VARCHAR(255) UNIQUE NOT NULL,
            admin_password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
        );
    `);
}
function super_admin() {
    template(`
        CREATE TABLE IF NOT EXISTS "super_admin"(
            id SERIAL PRIMARY KEY,
            super_admin_name VARCHAR(255) NOT NULL,
            super_admin_email VARCHAR(255) UNIQUE NOT NULL,
            super_admin_password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
        )
    `);
}

users();
admins();
super_admin();