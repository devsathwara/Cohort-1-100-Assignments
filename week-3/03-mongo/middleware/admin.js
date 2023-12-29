const mongoose = require('mongoose');
const { Admin } = require('../db/index');

async function adminMiddleware(req, res, next) {
    console.log("Enter");
    try {
        // Implement admin auth logic
        // You need to check the headers and validate the admin from the admin DB.
        // Check readme for the exact headers to be expected

        const username = req.headers["username"];
        const password = req.headers["password"];

        // Use await to execute the query and get the result
        const admin = await Admin.findOne({
            username: username,
            password: password // Note: Consider using a password hashing library here
        });

        if (admin) {
            console.log("Admin found");
            next(); // Continue to the next middleware or route handler
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = adminMiddleware;
