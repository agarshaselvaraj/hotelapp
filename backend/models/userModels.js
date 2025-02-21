const pool = require("../database");

// Find user by email
const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

// Create new user
const createUser = async (name, email, hashedPassword, phone, address) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, password, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, hashedPassword, phone, address]
    );
    return result.rows[0];
};

module.exports = { findUserByEmail, createUser };
