const mongoose = require('mongoose');
const {User} = require('../db/index')
async function userMiddleware(req, res, next) {
       // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers["username"];
    const password=req.headers["password"];
    const result = await User.findOne({
        username:username,
        password:password
    });
if(!result){
    return res.status(401).send("Unauthorized");
}
next();
}

module.exports = userMiddleware;