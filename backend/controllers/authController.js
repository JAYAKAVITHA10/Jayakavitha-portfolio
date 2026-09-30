const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ===============================
// ADMIN LOGIN
// ===============================

const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // Check admin email
        if (
            email.trim().toLowerCase() !==
            process.env.ADMIN_EMAIL.trim().toLowerCase()
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare password with stored bcrypt hash
        const passwordMatch = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                email: process.env.ADMIN_EMAIL,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token
        });

    } catch (error) {

        console.error("Admin login error:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to login."
        });
    }
};


module.exports = {
    loginAdmin
};