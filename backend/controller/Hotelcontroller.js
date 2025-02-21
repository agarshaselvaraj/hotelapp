const cloudinary = require("../cloudinary");
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);
const streamifier = require('streamifier'); // Add this line

const addHotel = async (req, res) => {
  try {
    console.log(req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files  uploaded" });
    }

    const {
      name,
      city,
      address,
      rating,
      price_per_night,
      room_type,
      amenities,
      description,
    } = req.body;
    const amenitiesArray = Array.isArray(amenities)
    ? amenities
    : amenities.split(",").map((item) => item.trim());
    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      const uploadStream = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "hotelimage" },
            (error, result) => {
              if (result) {
                resolve(result.secure_url);
                console.log("Upload successful:", result.secure_url);
              } else {
                reject(error);
                console.error("Upload error:", error);
              }
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      };
      const imageUrl = await uploadStream();
      imageUrls.push(imageUrl);
    }

    // Insert data into PostgreSQL
    await db.none(
      `INSERT INTO hotels 
      (name, city, address, rating, price_per_night, room_type, amenities, description, images, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
      [
        name,
        city,
        address,
        rating,
        price_per_night,
        room_type,
        amenitiesArray,
        description,
        JSON.stringify(imageUrls),
      ]
    );

    res.status(201).json({ message: "Hotel details added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add hotel details." });
  }
};

module.exports = { addHotel };
