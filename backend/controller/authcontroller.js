const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModels");

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Hashed Password:", hashedPassword); 

        // Create new user
        const newUser = await createUser(name, email, hashedPassword, phone, address);
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        // Check if user exists
        const user = await findUserByEmail(email);
    
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        req.session.user = { id: user.id, email: user.email };
        console.log("User logged in:", req.session.user);

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,  // Prevent access from JavaScript (more secure)
            secure: false,   // Set to true in production (HTTPS)
            sameSite: "lax",
        });

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


module.exports = { registerUser, loginUser };
