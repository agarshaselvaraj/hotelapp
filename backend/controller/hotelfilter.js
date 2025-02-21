const { Pool } = require('pg');
const pool = require('../database'); // Import database configuration

// Controller to fetch filtered hotels
const getFilteredHotels = async (req, res) => {
    const { 
        city, 
        price_per_night = 6000, 
        amenities = [], 
        rating = [], 
        page = 1, 
        limit = 10 
    } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    try {
        const offset = (page - 1) * limit;
        const parsedAmenities = typeof amenities === "string" ? JSON.parse(amenities) : amenities;
        // Base query
        let query = `
            SELECT 
                hotel_id, 
                name, 
                description, 
                rating, 
                amenities, 
                images[1] AS image 
            FROM hotels 
            WHERE LOWER(city) = LOWER($1) AND price_per_night <= $2
        `;

        const values = [city, price_per_night];
        let index = 3; // Parameter index for query (after $1 and $2)

        // Add facilities filter if provided
        if (parsedAmenities.length > 0) {
            query += ` AND amenities @> $${index++}`;
            values.push(`{${parsedAmenities.join(',')}}`);
        }

        // Add rating filter if provided
       
        if (rating) {
            query += ` AND rating >= $${index++}`; // Assuming filter for minimum rating
            values.push(Number(rating)); // Ensure rating is numeric
        }
        // Add pagination
        query += ` LIMIT $${index++} OFFSET $${index}`;
        values.push(limit, offset);

        // Execute the query
        const { rows } = await pool.query(query, values);

        res.json({ hotels: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { getFilteredHotels };
