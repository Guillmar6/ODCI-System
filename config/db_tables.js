const pool = require('./db');

function template(sqlCode) {
    try {
        const result = pool.query(sqlCode);
    } catch (err) {
        console.error(err);
    }
}

function departments() {
    template(`
        CREATE TABLE IF NOT EXISTS "departments"(
            id SERIAL PRIMARY KEY,
            department_name VARCHAR(255) NOT NULL
        );
    `);

    // Rows
    template(`
        INSERT INTO "departments"(department_name)
        SELECT 'ITD'
        WHERE NOT EXISTS(
            SELECT 1 FROM departments WHERE department_name='ITD'
        );
    `);
    template(`
        INSERT INTO "departments"(department_name)
        SELECT 'TED'
        WHERE NOT EXISTS(
            SELECT 1 FROM departments WHERE department_name='TED'
        );
    `);
    template(`
        INSERT INTO "departments"(department_name)
        SELECT 'ASD'
        WHERE NOT EXISTS(
            SELECT 1 FROM departments WHERE department_name='ASD'
        );
    `);
}

function users() {
    template(`
        CREATE TABLE IF NOT EXISTS "users"(
            id SERIAL PRIMARY KEY,
            faculty_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            department INT REFERENCES departments(id) ON DELETE SET NULL,
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

departments();
users();
admins();