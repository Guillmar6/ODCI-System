const pool = require('./db');

async function super_admin_default() {
    try {
        const result = await pool.query(`
            INSERT INTO "super_admin"(super_admin_name, super_admin_email, super_admin_password, role)
            SELECT 'Abigail S. Limos', 'sample@cvsu.edu.ph', 'pass', 'superadmin'
            WHERE NOT EXISTS(
                SELECT 1 FROM super_admin WHERE super_admin_name='Abigail S. Limos'
            );
        `);
    } catch (err) {
        console.error(err);
    }
}

super_admin_default();