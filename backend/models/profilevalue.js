const pool = require("../database"); // Pool from pg

// Fetch Profile by ID
const getProfileById = async (id) => {
  try {
    const query = `SELECT * FROM profile WHERE id = $1;`;
    const res = await pool.query(query, [id]);
    return res.rows[0]; // Return the profile data if found
  } catch (err) {
    throw new Error("Failed to fetch profile");
  }
};

// Update Profile by ID
const updateProfile = async (id, profileData) => {
  try {
    const query = `
      UPDATE profile
      SET name = $1, email = $2, phone = $3, address = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [
      profileData.name,
      profileData.email,
      profileData.phone,
      profileData.address,
      id,
    ];
    const res = await pool.query(query, values);
    return res.rows[0]; // Return the updated profile
  } catch (err) {
    throw new Error("Failed to update profile");
  }
};

module.exports = {
  getProfileById,
  updateProfile,
};
