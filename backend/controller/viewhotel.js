const { Pool } = require('pg');
const pool = require('../database'); 

    const viewhotels=async (req, res) =>
     {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM hotels WHERE hotel_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
module.exports = { viewhotels };
