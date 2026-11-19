const pool = require('./db');

async function super_admin_default() {
    try {
        const result = await pool.query(`
            INSERT INTO "admins"(admin_name, admin_email, admin_password, role)
            SELECT 'Abigail S. Limos', 'sample@cvsu.edu.ph', 'pass', 'superAdmin'
            WHERE NOT EXISTS(
                SELECT 1 FROM admins WHERE admin_name='Abigail S. Limos'
            );
        `);
    } catch (err) {
        console.error(err);
    }
}

super_admin_default();