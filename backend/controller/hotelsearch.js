const { Pool } = require('pg');
const pool = require('../database'); // Import database configuration

// Controller to fetch paginated hotels
const getHotels = async (req, res) => {
    const { city, page = 1, limit = 10 } = req.query;
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }
    try {
        const offset = (page - 1) * limit;

        const query = `
            SELECT 
                hotel_id, 
                name, 
                description, 
                rating, 
                amenities[1:3] AS amenities, -- Limit to 3 amenities
                images[1] AS image -- Show only the first image
            FROM hotels 
            WHERE LOWER(city) = LOWER($1)
            LIMIT $2 OFFSET $3
        `;

        const { rows } = await pool.query(query, [city, limit, offset]);
        res.json({ hotels: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { getHotels };
